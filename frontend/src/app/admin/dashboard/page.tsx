import { Card } from "@/components/ui/card";
import MentorLayout from "../layout";

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6">Total Users: 1200</Card>
        <Card className="p-6">Active Courses: 45</Card>
        <Card className="p-6">Revenue: $12,500</Card>
      </div>

      <div className="mt-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">john@example.com</td>
                  <td className="px-4 py-2">Student</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">jane@example.com</td>
                  <td className="px-4 py-2">Instructor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
