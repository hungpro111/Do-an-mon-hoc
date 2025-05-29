"use client";
import useAuthStore from "@/store/store";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const Header = () => {
  const { role, profile, userName, clearCookieStore } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Menu cho người dùng chưa đăng nhập
  const notLoginMenu = () => (
    <>
      <div className="col-lg-7 col-md-9 col-12">
        <div className="main-menu">
          <nav className="navigation">
            <ul className="nav menu">
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">Trang chủ</Link>
              </li>
              <li className={pathname === "/list_doctor" ? "active" : ""}>
                <Link href="/list_doctor">Bác sĩ</Link>
              </li>
              <li className={pathname === "/services" ? "active" : ""}>
                <Link href="/services">Dịch vụ</Link>
              </li>
              <li className={pathname === "/contact" ? "active" : ""}>
                <Link href="/contact">Liên hệ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="col-lg-2 col-12"></div>
    </>
  );

  // Menu cho bệnh nhân
  const patientMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            <li className={pathname === "/" ? "active" : ""}>
              <Link href="/">Trang chủ</Link>
            </li>
            <li className={pathname === "/user" ? "active" : ""}>
              <Link href="/user">Dịch vụ</Link>
            </li>
            <li className={pathname === "/list_doctor" ? "active" : ""}>
              <Link href="/list_doctor">Danh sách bác sĩ</Link>
            </li>
            <li className={pathname === "/contact" ? "active" : ""}>
              <Link href="/contact">Liên hệ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  // Menu cho admin
  const adminMenu = () => (
    <div className="col-lg-9 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            <li className={pathname === "/admin" ? "active" : ""}>
              <Link href="/admin">QL Doanh thu</Link>
            </li>
            <li className={pathname === "/admin/doctor" ? "active" : ""}>
              <Link href="/admin/doctor">QL Bác sĩ</Link>
            </li>
            <li className={pathname === "/admin/staff" ? "active" : ""}>
              <Link href="/admin/staff">QL Nhân viên</Link>
            </li>
            <li className={pathname === "/admin/patient" ? "active" : ""}>
              <Link href="/admin/patient">QL Bệnh nhân</Link>
            </li>
            <li className={pathname === "/admin/bill" ? "active" : ""}>
              <Link href="/admin/bill">QL Hóa đơn</Link>
            </li>
            <li className={pathname === "/admin/medicine" ? "active" : ""}>
              <Link href="/admin/medicine">QL Thuốc</Link>
            </li>
            <li className={pathname === "/admin/account" ? "active" : ""}>
              <Link href="/admin/account">QL Tài khoản</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  // Menu cho nhân viên
  const staffMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            <li className={pathname === "/staff" ? "active" : ""}>
              <Link href="/staff">QL lịch khám</Link>
            </li>
            <li className={pathname === "/staff/bill" ? "active" : ""}>
              <Link href="/staff/bill">QL Hóa đơn</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  // Menu cho bác sĩ
  const doctorMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            <li className={pathname === "/doctor" ? "active" : ""}>
              <Link href="/doctor">QL lịch khám</Link>
            </li>
            <li className={pathname === "/doctor/medical-record" ? "active" : ""}>
              <Link href="/doctor/medical-record">QL sổ khám bệnh</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12"></div>
            <div className="col-lg-8 col-md-6 col-12">
              <ul className="top-contact">
                <li>
                  <i className="fa fa-phone"></i>+880 1234 56789
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:support@yourmail.com">support@yourmail.com</a>
                </li>

                {/* Phần đăng nhập / đăng xuất được gói trong một thẻ duy nhất để tránh hydration mismatch */}
                <li className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer">
                  {role && userName ? (
                    <span
                      onClick={() => {
                        clearCookieStore();
                        router.push("/");
                      }}
                    >
                      Đăng xuất
                    </span>
                  ) : (
                    <Link href="/login">Đăng nhập</Link>
                  )}
                </li>

                {/* Hiển thị tên người dùng nếu đã đăng nhập */}
                {role && userName && (
                  <li>
                    <span className="font-bold">User: {userName}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-inner">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="logo">
                  <Link href="/">
                    <Image
                      className="w-20"
                      src="/img/new-logo.jpg"
                      alt="Logo"
                      width={1200}
                      height={800}
                    />
                  </Link>
                </div>
                <div className="mobile-nav"></div>
              </div>

              {!role && notLoginMenu()}
              {role === "PATIENT" && patientMenu()}
              {role === "ADMIN" && adminMenu()}
              {role === "STAFF" && staffMenu()}
              {role === "DOCTOR" && doctorMenu()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


// "use client";
// import useAuthStore from "@/store/store";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import React from "react";
// import Image from "next/image";
// const Header = () => {
//   const { role, profile, userName, clearCookieStore } = useAuthStore();

//   const router = useRouter();
//   const pathname = usePathname();
//   const notLoginMenu = () => {
//     return (
//       <>
//         <div className="col-lg-7 col-md-9 col-12">
//           {/* Main Menu */}
//           <div className="main-menu">
//             <nav className="navigation">
//               <ul className="nav menu">
//                 <li className={pathname === "/" ? "active" : ""}>
//                   <Link href="/">Trang chủ</Link>
//                 </li>
//                 <li className={pathname === "/list_doctor" ? "active" : ""}>
//                   <Link href="/list_doctor">Bác sĩ</Link>
//                 </li>
//                 <li className={pathname === "/services" ? "active" : ""}>
//                   <Link href="/services">Dịch vụ</Link>
//                 </li>
//                 <li className={pathname === "/contact" ? "active" : ""}>
//                   <Link href="/contact">Liên hệ</Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//           {/* End Main Menu */}
//         </div>
//         <div className="col-lg-2 col-12">
//           <div className="get-quote">
//             {/* <Link href="/user" className="btn">
//               Đặt lịch khám
//             </Link> */}
//           </div>
//         </div>
//       </>
//     );
//   };
//   const patientMenu = () => {
//     return (
//       <div className="col-lg-7 col-md-9 col-12">
//         {/* Main Menu */}
//         <div className="main-menu">
//           <nav className="navigation">
//             <ul className="nav menu">
//               <li className={pathname === "/" ? "active" : ""}>
//                 <Link href="/">Trang chủ</Link>
//               </li>
//               <li className={pathname === "/user" ? "active" : ""}>
//                 <Link href="/user">Dịch vụ</Link>
//               </li>
//               <li className={pathname === "/list_doctor" ? "active" : ""}>
//                 <Link href="/list_doctor">Danh sách bác sĩ</Link>
//               </li>
//               <li className={pathname === "/contact" ? "active" : ""}>
//                 <Link href="/contact">Liên hệ</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         {/* End Main Menu */}
//       </div>
//     );
//   };
//   const adminMenu = () => {
//     return (
//       <div className="col-lg-9 col-md-9 col-12">
//         {/* Main Menu */}
//         <div className="main-menu">
//           <nav className="navigation">
//             <ul className="nav menu">
//               <li className={pathname === "/admin" ? "active" : ""}>
//                 <Link href="/admin">QL Doanh thu</Link>
//               </li>
//               <li className={pathname === "/admin/doctor" ? "active" : ""}>
//                 <Link href="/admin/doctor">QL Bác sĩ</Link>
//               </li>
//               <li className={pathname === "/admin/staff" ? "active" : ""}>
//                 <Link href="/admin/staff">QL Nhân viên</Link>
//               </li>
//               <li className={pathname === "/admin/patient" ? "active" : ""}>
//                 <Link href="/admin/patient">QL Bệnh nhân</Link>
//               </li>
//               <li className={pathname === "/admin/bill" ? "active" : ""}>
//                 <Link href="/admin/bill">QL Hóa đơn</Link>
//               </li>
//               <li className={pathname === "/admin/medicine" ? "active" : ""}>
//                 <Link href="/admin/medicine">QL Thuốc </Link>
//               </li>
//               <li className={pathname === "/admin/account" ? "active" : ""}>
//                 <Link href="/admin/account">QL Tài khoản </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         {/* End Main Menu */}
//       </div>
//     );
//   };
//   const staffMenu = () => {
//     return (
//       <div className="col-lg-7 col-md-9 col-12">
//         {/* Main Menu */}
//         <div className="main-menu">
//           <nav className="navigation">
//             <ul className="nav menu">
//               <li className={pathname === "/staff" ? "active" : ""}>
//                 <Link href="/staff">QL lịch khám</Link>
//               </li>
//               <li className={pathname === "/staff/bill" ? "active" : ""}>
//                 <Link href="/staff/bill">QL Hóa đơn</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         {/* End Main Menu */}
//       </div>
//     );
//   };
//   const doctorMenu = () => {
//     return (
//       <div className="col-lg-7 col-md-9 col-12">
//         {/* Main Menu */}
//         <div className="main-menu">
//           <nav className="navigation">
//             <ul className="nav menu">
//               <li className={pathname === "/doctor" ? "active" : ""}>
//                 <Link href="/doctor">QL lịch khám</Link>
//               </li>
//               <li
//                 className={
//                   pathname === "/doctor/medical-record" ? "active" : ""
//                 }
//               >
//                 <Link href="/doctor/medical-record">QL sổ khám bệnh</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         {/* End Main Menu */}
//       </div>
//     );
//   };
//   return (
//     <header className="header">
//       <div className="topbar">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-4 col-md-5 col-12"></div>
//             <div className="col-lg-8 col-md-6 col-12">
//               {/* Top Contact */}
//               <ul className="top-contact">
//                 <li>
//                   <i className="fa fa-phone"></i>+880 1234 56789
//                 </li>
//                 <li>
//                   <i className="fa fa-envelope"></i>
//                   <a href="mailto:support@yourmail.com">support@yourmail.com</a>
//                 </li>
//                 {role && userName && (
//                   <li
//                     className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer"
//                     onClick={() => {
//                       clearCookieStore();
//                       router.push("/");
//                     }}
//                   >
//                     Đăng xuất
//                   </li>
//                 )}
//                 {!role && !userName && (
//                   <Link
//                     className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer"
//                     href={"/login"}
//                   >
//                     Đăng nhập
//                   </Link>
//                 )}
//                 {role && userName && (
//                   <li>
//                     <span className="font-bold">User: {userName}</span>
//                   </li>
//                 )}
//               </ul>
//               {/* End Top Contact */}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* End Topbar */}
//       {/* Header Inner */}
//       <div className="header-inner">
//         <div className="container">
//           <div className="inner">
//             <div className="row">
//               <div className="col-lg-3 col-md-3 col-12">
//                 {/* Start Logo */}
//                 <div className="logo">
//                   <Link href="/">
//                     <Image
//                       className="w-20"
//                       src="/img/new-logo.jpg"
//                       alt="#"
//                       width={1200}
//                       height={800}
//                     />
//                   </Link>
//                 </div>
//                 {/* End Logo */}
//                 {/* Mobile Nav */}
//                 <div className="mobile-nav"></div>
//                 {/* End Mobile Nav */}
//               </div>
//               {!role && notLoginMenu()}
//               {role == "PATIENT" && patientMenu()}
//               {role == "ADMIN" && adminMenu()}
//               {role == "STAFF" && staffMenu()}
//               {role == "DOCTOR" && doctorMenu()}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* End Header Inner */}
//     </header>
//   );
// };

// export default Header;
