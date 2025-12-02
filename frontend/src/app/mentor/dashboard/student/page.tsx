"use client";

import { useState } from "react";
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar: string;
}

const initialMockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Manager",
    status: "active",
    joinDate: "2024-02-20",
    avatar: "SS",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "inactive",
    joinDate: "2024-03-10",
    avatar: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-01-25",
    avatar: "EB",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@example.com",
    role: "Manager",
    status: "active",
    joinDate: "2024-02-14",
    avatar: "DL",
  },
  {
    id: 6,
    name: "Lisa Chen",
    email: "lisa@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-30",
    avatar: "LC",
  },
  {
    id: 7,
    name: "James Wilson",
    email: "james@example.com",
    role: "User",
    status: "active",
    joinDate: "2024-03-05",
    avatar: "JW",
  },
  {
    id: 8,
    name: "Patricia Garcia",
    email: "patricia@example.com",
    role: "User",
    status: "inactive",
    joinDate: "2024-02-28",
    avatar: "PG",
  },
];

const ITEMS_PER_PAGE = 5;

export default function UserList() {
  const [users, setUsers] = useState(initialMockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddUser = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id), 0) + 1,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      avatar: `${userData.firstName.charAt(0)}${userData.lastName.charAt(
        0
      )}`.toUpperCase(),
    };
    setUsers((prev) => [newUser, ...prev]);
    console.log("[v0] New user added:", newUser);
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Student
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view all student in your system
          </p>
        </div>
      </div>

      {/* Search & Filters Section */}
      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>

            {/* Filters */}
          </div>
        </CardContent>
      </Card>

      {/* Users Table - Desktop View */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Join Date</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={
                      user.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {user.joinDate}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Users List - Mobile View */}
      <div className="md:hidden space-y-3">
        {paginatedUsers.map((user) => (
          <Card key={user.id} className="border border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header with Avatar and Name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Role</p>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                      className={
                        user.status === "active"
                          ? "bg-green-50 text-green-700 border-green-200 text-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 text-xs"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Join Date */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Join Date
                  </p>
                  <p className="text-sm text-foreground">{user.joinDate}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 3 && (
              <PaginationItem>
                <span className="px-1.5">...</span>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
