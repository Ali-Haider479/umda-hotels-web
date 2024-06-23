"use client";
import SubHeader from "@/components/ui/SubHeader";
import { Box, Link, Typography, useMediaQuery } from "@mui/material";

const PrivacyPolicyPage = () => {
  const isMobScreen = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <SubHeader heading={"Privacy Policy"} />
      <Box paddingX={isMobScreen ? 3 : 15} paddingY={8}>
        <Typography variant="body1" paragraph>
          Your privacy is important to us. We value your trust and are committed
          to protecting and safeguarding any personal information you give us.
          This document, which we update from time to time, describes how we use
          and process your personal data and how we use cookies. It also tells
          you how you can contact us if you have questions about your personal
          information. Umda provides online travel hotel booking through its own
          websites and social media. The information that follows applies to all
          of these platforms.
        </Typography>

        <Typography variant="h5" fontWeight={"bold"}>
          Privacy
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          What kind of personal information does Umda use?
        </Typography>
        <Typography variant="body2" paragraph>
          When you make a reservation, you'll be asked for your name, address,
          telephone number, email address, payment details, the names of guests
          traveling with you and your preferences for your stay. <br />
          To make it easier to manage your reservations, you can open a user
          account. This allows you to save your personal settings, review
          previous bookings and manage future reservations. <br />
          When you visit our website, even if you don't make a reservation, we
          may collect certain information, like your IP address, or browser, and
          information about your computer's operating system, application
          version, language settings and pages that have been shown to you. If
          you're using a mobile device, we might also collect data that
          identifies your mobile device, device-specific settings and
          characteristics and latitude/longitude details. <br />
          We may also receive information about you when you use certain social
          media services.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Why does Umda collect, use and share your personal data?
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Reservations:</strong> First and foremost, we use your
          personal data to complete and administer your online reservation and
          forward your reservation details to the accommodation you have booked.{" "}
          <br />
          <strong>Customer service:</strong> We provide customer service 24/7
          from our local offices in order to help you find appropriate services
          and any questions you might have about your reservation. <br />
          <strong>Guest reviews:</strong> We may use your contact information to
          invite you to write a guest review after your stay. This can help
          other travelers choose a place to stay that suits them best. <br />
          <strong>Account administration:</strong> We offer a user account
          facility on our website. We use the information you give us to
          administer this, allowing you to manage your bookings, take advantage
          of special offers, make future reservations more easily and manage
          your personal settings. Managing personal settings allows you to keep
          and share lists, share photos, see properties that you've searched for
          before, and see other information you've provided about accommodations
          and destinations. It also allows you to see any reviews you submitted
          about places you stayed in. If you want, you can share certain
          information in your user account by creating a public profile that's
          associated with either your own first name or a screen name of your
          choice. The type of information you can share on this platform
          includes your photo, the names of places you've stayed in, your lists,
          your plans for future trips, your reviews and other information about
          services and destinations. <br />
          <strong>Marketing activities:</strong> We also use your information
          for marketing activities, as permitted by law. For example:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" paragraph>
              When you make a reservation with us or set up a user account, we
              may use your contact information to send you news about similar
              travel-related products and services. We also send our customers
              regular newsletters by email. You can opt out, or unsubscribe,
              from marketing communication at any time.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              Based on the information you share with us, individualized offers
              may be shown to you on the Umda website, in mobile apps or on
              third-party websites, including social media sites.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              When we believe that a particular offer may be of interest to you,
              we may decide to make contact with you by phone.
            </Typography>
          </li>
        </ul>
        <Typography variant="body2" paragraph>
          <strong>Other communications:</strong> There may be other times when
          we get in touch by email, by post, by phone or by texting you,
          depending on the contact information you share with us. There could be
          a number of reasons for this:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" paragraph>
              We may need to respond to and handle requests you have made.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              If you haven't finalized a reservation online, we may email you a
              reminder to continue with your reservation. We believe that this
              additional service is useful to you because it allows you to carry
              on with a reservation without having to search for the service
              items again or fill in all the reservation details from scratch.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              When you use our services, we may send you a questionnaire or
              invite you to provide a review about your experience with Umda.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              We may also send you other material related to your reservation,
              such as how to contact Umda if you need assistance while you're
              away, or a summary of previous reservations you made using Umda.
            </Typography>
          </li>
        </ul>
        <Typography variant="body2" paragraph>
          <strong>Market research:</strong> We sometimes ask our customers to
          take part in market research. Any additional personal details that you
          give us as part of the market research will only be used with your
          consent. <br />
          <strong>Fraud detection and prevention:</strong> We may use personal
          data for the detection and prevention of fraud and other illegal or
          unwanted activities. <br />
          <strong>Improving our services:</strong> Finally, we use personal
          information for analytical purposes, to improve our services, enhance
          the user experience, and improve the functionality and quality of our
          online travel services.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How does Umda use social media?
        </Typography>
        <Typography variant="body2" paragraph>
          We use social media to promote our properties and to promote, improve
          and facilitate our own website. For example, we integrated social
          media plugins into the Umda website. So when you click on one of the
          buttons and register with your social media account, information is
          shared with your social media provider, and possibly presented on your
          social media profile to be shared with others in your network. <br />
          In addition to implementing these buttons, Umda uses social media by
          maintaining accounts on several social media sites and by offering
          social apps. These social media services may allow you to share
          information with Umda. <br />
          When you register with a social media app, you'll be told which
          information will be shared with Umda. The information you choose to
          share with us may include the basic information that’s already
          available in your social media profile, email address, status updates
          and your friends list. This information is necessary to create a
          unique user experience on our website. We may also enable you to sign
          in to Umda services with your social media accounts. Your social media
          provider will be able to tell you more about how they use and process
          your data in such cases.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How does Umda share your data with third parties?
        </Typography>
        <Typography variant="body2" paragraph>
          In certain circumstances, we may share your personal data with third
          parties.
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" paragraph>
              The accommodation you booked: In order to complete your
              reservation, we need to transfer relevant reservation details.
              This may include information like your name, contact and payment
              details, the names of guests traveling with you and any
              preferences you specified when making a booking.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              Your local Umda office: In order to support you during the
              reservation process and throughout your stay, your details may be
              shared with subsidiaries of the Umda corporate family.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              Third-party service providers: We may use third-party service
              providers to process your personal information on our behalf for
              the purposes.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" fontWeight={"bold"}>
          How does Umda use mobile devices?
        </Typography>
        <Typography variant="body2" paragraph>
          We have a fully optimized website for a variety of mobile devices.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How does Umda use guest reviews and other destination-related
          information you share with us?
        </Typography>
        <Typography variant="body2" paragraph>
          After your use of any service booked through us, you may be invited to
          submit a guest review, which may ask for information about the service
          item, the surrounding areas, and the destination. If you don't want
          your name to show with your review, you can use your screen name
          (which you can choose in your user account) or it can be displayed
          anonymously. By completing a guest review, you're agreeing that it can
          be displayed (as further described in our Terms and Conditions) on,
          for example, the relevant service information page on our websites, in
          our mobile apps, in our social media accounts and in social apps, or
          on the website of the relevant property or on our business partner's
          website, to inform other travelers about the quality of the service
          item you used. <br />
          If you indicate that a guest review was helpful - or not helpful - we
          will aggregate this with feedback from other customers in order to
          sort and prioritize guest reviews. We may use the information in your
          lists or in other destination-related information you share with us in
          an anonymous format to help other travelers find the right
          destination.
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          Cookies
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          What is a cookie?
        </Typography>
        <Typography variant="body2" paragraph>
          A cookie is a small amount of data that is placed in the browser of
          your computer or on your mobile device. This Privacy and Cookies
          Policy applies to cookies and similar technologies (hereafter together
          referred to as "cookies").
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Why are cookies used?
        </Typography>
        <Typography variant="body2" paragraph>
          Web pages have no memory. If you are surfing from page to page within
          a website, you will not be recognized as the same user across pages.
          Cookies enable your browser to be recognized by the website. So
          cookies are mainly used to remember the choices you have made -
          choices such as the language you prefer and the currency you use. They
          will also make sure you are recognized when you return to a website.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Do all cookies do the same thing?
        </Typography>
        <Typography variant="body2" paragraph>
          No, there are different types of cookies and different ways of using
          them. Cookies can be categorized according to their function, their
          lifespan and according to who places them on a website.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How long do Umda cookies stay active?
        </Typography>
        <Typography variant="body2" paragraph>
          The cookies we use have varying lifespans. The maximum lifespan we set
          on some is five years from your last visit to our website. You can
          erase all cookies from your browser any time you want.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Does Umda use third-party marketing and analytics cookies?
        </Typography>
        <Typography variant="body2" paragraph>
          Yes Umda uses the services of trusted and recognized online
          advertising and marketing companies. Umda may also use third-party
          providers for analytical purposes. To enable their services, these
          companies need to place cookies. <br />
          The providers we use are committed to building consumer awareness and
          establishing responsible business and data management practices and
          standards. In order to control the collection of data for analytical
          purposes by Google Analytics, you may want to visit the following
          link:{" "}
          <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank">
            Google Analytics Opt-out Browser Add-on
          </Link>
          .
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Who has access to Umda cookie data?
        </Typography>
        <Typography variant="body2" paragraph>
          Only Umda has access to Umda cookies. Cookies placed by third parties
          can be accessed by these third parties.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How can you manage your cookie preferences?
        </Typography>
        <Typography variant="body2" paragraph>
          Using your browser settings in, for example, Internet Explorer,
          Safari, Firefox or Chrome, you can set which cookies to accept and
          which to reject. Where you find these settings depends on which
          browser you use. Use the "Help" function in your browser to locate the
          settings you need. <br />
          If you choose not to accept certain cookies, you may not be able to
          use some functions on our website. Plus, opting out of an online
          advertising network doesn't mean that you won't receive or be subject
          to online advertising or marketing analysis. It means that the network
          you opted out of will no longer deliver ads tailored to your web
          preferences and browsing patterns.
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          Security
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          What security procedures does Umda put in place to safeguard your
          personal data?
        </Typography>
        <Typography variant="body2" paragraph>
          In accordance with various data protection laws, we observe reasonable
          procedures to prevent unauthorized access and the misuse of personal
          information. <br />
          We use appropriate business systems and procedures to protect and
          safeguard the personal information you give us. We also use security
          procedures and technical and physical restrictions for accessing and
          using the personal information on our servers. Only authorized
          personnel are permitted to access personal information in the course
          of their work. <br />
          Your credit card details - when they are needed as part of the
          reservation process - are stored for a maximum of 10 days. After that,
          your credit card data will be either permanently deleted from our
          systems or will remain hashed in our system for fraud detection
          purposes. This is unless you have chosen to store your credit card
          details in your personal account.
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          Children
        </Typography>
        <Typography variant="body1" paragraph>
          The services offered by Umda are not directed at children under 18
          years old. The use of any of our services is only allowed with the
          valid consent of a parent or a guardian. If we receive information
          from a child under 18 years old, we reserve the right to delete it.
        </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          Contact
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          How can you control the personal data you have given to Umda?
        </Typography>
        <Typography variant="body2" paragraph>
          You always have the right to review the personal information we keep
          about you. You can request an overview of your personal data by
          emailing us at info@umdahotels.com. <br />
          If the personal information we have for you is incorrect, we will
          update it at your request. You can also ask us to remove your personal
          data from our customer database. However, we may need to retain
          certain information, for example, for legal or administrative record
          keeping.
        </Typography>
        <Typography variant="h6" fontWeight={"bold"}>
          Who is responsible for the processing of personal data on the Umda
          website and apps?
        </Typography>
        <Typography variant="body2" paragraph>
          Umda controls the processing of personal data on its websites and
          mobile apps. Umda is a privately registered company with SECP and
          headquartered in Islamabad. If you have any suggestions or comments
          about this privacy notice, please send an email to
          info@umdahotels.com.
        </Typography>
      </Box>
    </>
  );
};

export default PrivacyPolicyPage;
