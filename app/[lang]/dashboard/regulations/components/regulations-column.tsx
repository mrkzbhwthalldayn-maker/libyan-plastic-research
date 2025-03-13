"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Form } from "@prisma/client";
import { DeleteForm, UpdateForm } from "./forms";
import { CustomLink } from "@/components/custom-link";

export const formsColumns: ColumnDef<Form>[] = [
  {
    accessorKey: "name",
    header: "الاسم",
    cell: ({ row }) => {
      const name = row.original?.name;
      return <div>{name ?? "لا يوجد"}</div>;
    },
  },
  {
    accessorKey: "enName",
    header: "الاسم بالإنجليزية",
    cell: ({ row }) => {
      const enName = row.original?.enName;
      return <div>{enName ?? "لا يوجد"}</div>;
    },
  },
  {
    accessorKey: "url",
    header: "الرابط",
    cell: ({ row }) => {
      const url = row.original?.url;
      if (url) {
        return (
          <CustomLink variant={"link"} target="_blank" href={url}>
            زيارة الرابط
          </CustomLink>
        );
      } else {
        return <div>لا يوجد</div>;
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <div>
          {createdAt ? new Date(createdAt).toLocaleDateString() : "لا يوجد"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const form = row.original;
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">افتح الأحداث</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>الأحداث</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(form.name));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ الاسم بنجاح",
                });
              }}
            >
              نسخ الاسم
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <UpdateForm form={form} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteForm id={form.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
