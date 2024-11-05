"use client";
import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ModuleRegistry,
  GridReadyEvent,
  FirstDataRenderedEvent,
} from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  MenuModule,
]);

interface BookingData {
  fullName: string;
  telephone: string;
  email: string;
  totalPrice: number;
  referenceNo: string;
  bookingStatus: string;
  paymentType: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: RoomData[];
}

interface RoomData {
  roomName: string;
  originalPrice: number;
  discountedPrice: number;
  roomsBooked: number;
  guests: number;
}

const BookingHistoryPage: React.FC = () => {
  const { data: session } = useSession();
  const containerStyle = useMemo(() => ({ width: "103%", height: "80%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setRowData] = useState<BookingData[]>([]);

  // Main grid columns for booking data
  const [columnDefs] = useState([
    {
      field: "fullName",
      headerName: "Full Name",
      cellRenderer: "agGroupCellRenderer",
      minWidth: 150,
      filter: "agTextColumnFilter",
    },
    {
      field: "telephone",
      headerName: "Telephone",
      minWidth: 150,
      filter: "agTextColumnFilter",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 220,
      filter: "agTextColumnFilter",
    },
    {
      field: "totalPrice",
      headerName: "Price",
      minWidth: 120,
      valueFormatter: (params: { value: number }) => `Rs. ${params.value}`,
    },
    {
      field: "referenceNo",
      headerName: "Reference No.",
      minWidth: 180,
      filter: "agTextColumnFilter",
    },
    {
      field: "bookingStatus",
      headerName: "Booking Status",
      minWidth: 150,
      cellRenderer: (params: { value: string }) => {
        let color;
        switch (params.value) {
          case "confirmed":
            color = "green";
            break;
          case "pending":
            color = "orange";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "black";
        }
        return (
          <span style={{ color, fontWeight: "bold" }}>
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        );
      },
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      minWidth: 150,

      cellRenderer: (params: { value: string }) => (
        <span>{params.value === "onSite" ? "On-Site" : "Online"}</span>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      minWidth: 150,
      cellRenderer: (params: { value: string }) => {
        let color;
        switch (params.value) {
          case "completed":
            color = "green";
            break;
          case "pending":
            color = "orange";
            break;
          case "failed":
            color = "red";
            break;
          default:
            color = "black";
        }
        return (
          <span style={{ color, fontWeight: "bold" }}>
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        );
      },
    },
    {
      field: "checkInDate",
      headerName: "Check-in Date",
      minWidth: 150,
      valueFormatter: (params: { value: string }) =>
        dayjs(params.value).format("YYYY-MM-DD"),
    },
    {
      field: "checkOutDate",
      headerName: "Check-out Date",
      minWidth: 160,
      valueFormatter: (params: { value: string }) =>
        dayjs(params.value).format("YYYY-MM-DD"),
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      // minWidth: 100,
      resizable: true,
    }),
    []
  );

  // Detail grid configuration for rooms
  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: [
          {
            field: "roomName",
            headerName: "Room Name",
            flex: 1,
          }, // Set fixed width for Room Name
          { field: "roomsBooked", headerName: "Rooms Booked", width: 160 }, // Flex to fill remaining space
          { field: "guests", headerName: "Guests", width: 120 },
          {
            field: "discountedPrice",
            headerName: "Price",
            valueFormatter: (params: { value: number }) =>
              `Rs. ${params.value}`,
            width: 140,
          },
        ],
        // defaultColDef: { flex: 1, minWidth: 100 },
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.rooms);
      },
    }),
    []
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    if (!session || !session.user) {
      console.error("Session or user information is missing.");
      return;
    }
    // Fetch booking data and set to rowData
    fetch(`/api/booking/user/${session.user.id}`) // Replace with actual endpoint
      .then((response) => response.json())
      .then((data: BookingData[]) => setRowData(data))
      .catch((error) => console.error("Error fetching booking data:", error));
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    // Expand the first row automatically
    params.api.getDisplayedRowAtIndex(0)?.setExpanded(true);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};

export default BookingHistoryPage;
