import PersonalDetails from "@/components/personaldetails/PersonalDetails";
import ChangePassword from "@/components/changepassword/ChangePassword";
import VerifyAccountAlert from "@/components/verifyaccountalertbox/VerifyAccountAlert";

const MyProfilePage = () => {
  return (
    <>
      <PersonalDetails />
      <ChangePassword />
      <VerifyAccountAlert />
    </>
  );
};

export default MyProfilePage;
