import { StaffLocationGMapInput } from '../../types/staff-location-g-map.input';

export function StaffLocationInfoWindowContentHelper({
  staffId,
  deviceId,
  firstName,
  lastName,
  staffRole,
  updateDateTime,
  staffNumber,
}: StaffLocationGMapInput): string {
  return `
  <p class="text-black mb-1">Staff:
    <a href="/users/staff/details/${staffId}">
      ${firstName} ${lastName}
    </a>
  </p>
  <p class="mb-0 text-black">Staff ID: ${staffNumber}</p>
  <p class="mb-0 text-black">Role: ${staffRole}</p>
  <p class="mb-0 text-black">Device ID: ${deviceId}</p>
  <p class="mb-0 text-black">Last Update: ${updateDateTime}</p>
  `;
}
