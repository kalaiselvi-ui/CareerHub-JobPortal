import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  ShieldCheck,
  UserRound,
  BriefcaseBusiness,
  MoreVertical,
  Eye,
  Pencil,
  UserCheck,
  Trash2,
  UserX,
} from "lucide-react";

// --- Types ---
export type UserRole = "admin" | "recruiter" | "candidate";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
}

// --- Mock Data ---
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "candidate",
    status: "active",
    joinedAt: "2026-07-28",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "recruiter",
    status: "active",
    joinedAt: "2026-07-24",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "candidate",
    status: "inactive",
    joinedAt: "2026-07-20",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "recruiter",
    status: "active",
    joinedAt: "2026-07-18",
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@careerhub.com",
    role: "admin",
    status: "active",
    joinedAt: "2026-07-10",
  },
  {
    id: "6",
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    role: "candidate",
    status: "active",
    joinedAt: "2026-07-08",
  },
  {
    id: "7",
    name: "Sophia Miller",
    email: "sophia.miller@example.com",
    role: "candidate",
    status: "active",
    joinedAt: "2026-07-05",
  },
  {
    id: "8",
    name: "James Taylor",
    email: "james.taylor@example.com",
    role: "recruiter",
    status: "inactive",
    joinedAt: "2026-06-30",
  },
];

// Role configuration for badges
const roleConfig: Record<
  UserRole,
  { label: string; className: string; icon: React.ElementType }
> = {
  admin: {
    label: "Admin",
    className: "bg-purple-50 text-purple-700 border-purple-200",
    icon: ShieldCheck,
  },
  recruiter: {
    label: "Recruiter",
    className: "bg-orange-50 text-secondary border-orange-200",
    icon: BriefcaseBusiness,
  },
  candidate: {
    label: "Candidate",
    className: "bg-blue-50 text-primary border-blue-200",
    icon: UserRound,
  },
};

export default function ManageUsers() {
  // Local state for UI
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // --- Filtering with useMemo ---
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Helpers
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // UI Action Handlers (local state modifications)
  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
    setActiveMenuId(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-dark">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage candidates, recruiters, and administrators available on the
            platform.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-border-subtle rounded-lg text-sm text-gray-600 shadow-xs self-start sm:self-auto">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-medium text-surface-dark">
            {users.length} Total Users
          </span>
        </div>
      </div>

      {/* 2. Search and Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as "all" | UserRole)}
            className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="recruiter">Recruiter</option>
            <option value="candidate">Candidate</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | UserStatus)
            }
            className="px-3 py-2 text-sm border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-dark bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* 3. User Table */}
      <div className="bg-white rounded-xl border border-border-subtle shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-surface-dark">
            <thead>
              <tr className="bg-surface-light border-b border-border-subtle text-xs uppercase font-semibold text-gray-500">
                <th className="py-3.5 px-5">User</th>
                <th className="py-3.5 px-5">Role</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 hidden sm:table-cell">Joined</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const roleItem = roleConfig[user.role];
                  const RoleIcon = roleItem.icon;
                  const isMenuOpen = activeMenuId === user.id;

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-surface-light/50 transition-colors"
                    >
                      {/* User Info / Avatar */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs shrink-0 border border-primary/20">
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${roleItem.className}`}
                        >
                          <RoleIcon className="w-3.5 h-3.5" />
                          {roleItem.label}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            user.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-gray-100 text-gray-600 border-gray-200"
                          }`}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-5 text-gray-500 text-xs hidden sm:table-cell">
                        {formatDate(user.joinedAt)}
                      </td>

                      {/* Action Dropdown Menu */}
                      <td className="py-3.5 px-5 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(isMenuOpen ? null : user.id)
                          }
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Options */}
                        {isMenuOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-5 mt-1 w-44 bg-white rounded-lg shadow-lg border border-border-subtle py-1 z-20 text-left text-xs">
                              <button
                                onClick={() => setActiveMenuId(null)}
                                className="w-full px-3 py-2 text-gray-700 hover:bg-surface-light flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-gray-400" />
                                View Profile
                              </button>
                              <button
                                onClick={() => setActiveMenuId(null)}
                                className="w-full px-3 py-2 text-gray-700 hover:bg-surface-light flex items-center gap-2"
                              >
                                <Pencil className="w-3.5 h-3.5 text-gray-400" />
                                Edit User
                              </button>
                              <button
                                onClick={() => toggleUserStatus(user.id)}
                                className="w-full px-3 py-2 text-gray-700 hover:bg-surface-light flex items-center gap-2"
                              >
                                {user.status === "active" ? (
                                  <>
                                    <UserX className="w-3.5 h-3.5 text-amber-500" />
                                    Deactivate User
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    Activate User
                                  </>
                                )}
                              </button>
                              <div className="my-1 border-t border-border-subtle" />
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="w-full px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                Delete User
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* 8. Empty State */
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UserX className="w-8 h-8 text-gray-300" />
                      <p className="font-medium text-sm text-surface-dark">
                        No users match your criteria.
                      </p>
                      <p className="text-xs text-gray-400">
                        Try adjusting your search terms or filter selections.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
