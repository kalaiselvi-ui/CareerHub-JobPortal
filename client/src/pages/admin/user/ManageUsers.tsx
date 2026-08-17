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
import { useALLUsers } from "../../../hooks/useUser.ts";
import type { UserRole, UserStatus } from "../../../type/user.type.ts";
import DashboardHeader from "../../../components/dashboard/common/DashboardHeader.tsx";
import StatCard from "../../../components/dashboard/common/StatCard.tsx";

// --- Types ---

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
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const { data: users = [] } = useALLUsers();

  // --- Filtering with useMemo ---
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const userStats = [
    {
      title: "Total Users",
      value: 156,
      icon: Users,
      iconBgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Admins",
      value: 4,
      icon: ShieldCheck,
      iconBgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Recruiters",
      value: 32,
      icon: BriefcaseBusiness,
      iconBgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Job Seekers",
      value: 120,
      icon: UserX,
      iconBgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  gap-4">
        <DashboardHeader
          title="Manage Users"
          description="View, manage roles, and monitor user accounts across the platform."
        />
        <div className="inline-flex w-fit items-center gap-2 px-3.5 py-2 bg-white border border-border-subtle rounded-lg text-sm text-gray-600 shadow-xs self-start sm:self-auto">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-medium text-surface-dark">
            {users.length} Total Users
          </span>
        </div>
      </div>

      {/* Reused StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
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
                  const isMenuOpen = activeMenuId === user._id;

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-surface-light/50 transition-colors"
                    >
                      {/* User Info / Avatar */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs shrink-0 border border-primary/20">
                            {getInitials(user.fullName)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {user.fullName}
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
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Action Dropdown Menu */}
                      <td className="py-3.5 px-5 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(isMenuOpen ? null : user._id)
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
                              <button className="w-full px-3 py-2 text-gray-700 hover:bg-surface-light flex items-center gap-2">
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
                              <button className="w-full px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2">
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
