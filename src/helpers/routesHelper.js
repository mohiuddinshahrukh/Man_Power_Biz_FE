export const routes = {
  auth: "/auth",
  adminDashboard: "/admindashboard",
  addUser: "/admindashboard/adduser",
  editUser: "/admindashboard/edituser",
  viewUser: "/admindashboard/viewusers",
  addservicecategory: "/admindashboard/addservicecategory",
  editservicecategory: "/admindashboard/editservicecategory",
  viewServiceCategories: "/admindashboard/viewservicecategories",
  addService: "/admindashboard/addservice",
  viewServices: "/admindashboard/viewservices",
  addPackage: "/admindashboard/addPackage",
  editPackage: "/admindashboard/editPackage",
  addPackageWithId: "/admindashboard/addPackage/:id",
  viewPackages: "/admindashboard/viewPackages",
  addBooking: "/admindashboard/addBooking",
  viewBookings: "/admindashboard/viewBookings",
  addPayment: "/admindashboard/addPayment",
  viewPayments: "/admindashboard/viewPayments",
  chats: "/admindashboard/chats",
  addComplaint: "/admindashboard/addComplaint",
  viewComplaints: "/admindashboard/viewComplaints",
  policies: "/admindashboard/policies",
  settings: "/admindashboard/settings",
  reviewsAndFeedbacks: "/admindashboard/reviewsAndFeedbacks",
  faq: "/admindashboard/faq",
  "*": "/BadRequest",
};

export const customerRoutes = {
  specificService: "/specificService",
  viewCart: "/viewCart",
  
};
