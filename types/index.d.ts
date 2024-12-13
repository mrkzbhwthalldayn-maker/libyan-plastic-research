// import { Roles } from "@prisma/client";

declare interface UserSession {
  id: string;
  fullName: string;
  // role: Roles;
  role: "admin" | "superAdmin";
  email?: string;
}

// type OfferTlype = "basic" | "sponsered" | "premium";
