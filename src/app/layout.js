import "./globals.css";
import AllProductsFetcher from "@/redux/ReduxAllProductsFetcher";
import ReduxProviders from "@/redux/ReduxProviders";
;


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {




  return (
    <html lang="en">
      <body className="m-0 p-0">
            <ReduxProviders>
              <AllProductsFetcher/> {/* fetch all products on project mount */}
                {children}
            </ReduxProviders>
      </body>
    </html>
  );
}
