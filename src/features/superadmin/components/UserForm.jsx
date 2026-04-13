import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UserForm = ({ defaultValues, mode, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        name="name"
        defaultValue={defaultValues?.name || ''}
        placeholder="Enter full name"
        required
      />
      
      <Input
        label="Email Address"
        name="email"
        type="email"
        defaultValue={defaultValues?.email || ''}
        placeholder="Enter email address"
        required
      />
      
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        defaultValue={defaultValues?.phone || ''}
        placeholder="Enter phone number"
      />
      
      <Select
        label="Company"
        name="company"
        defaultValue={defaultValues?.company || ''}
        required
      >
        <option value="">Select Company</option>
        <option value="Metro Properties LLC">Metro Properties LLC</option>
        <option value="Urban Living Inc">Urban Living Inc</option>
        <option value="Cozy Homes Co">Cozy Homes Co</option>
        <option value="Premier Realty">Premier Realty</option>
        <option value="City Apartments">City Apartments</option>
        <option value="Downtown Living">Downtown Living</option>
        <option value="Luxury Apartments">Luxury Apartments</option>
      </Select>
      
      <Select
        label="Role"
        name="role"
        defaultValue={defaultValues?.role || ''}
        required
      >
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="tenant">Tenant</option>
      </Select>
      
      <Select
        label="Status"
        name="status"
        defaultValue={defaultValues?.status || 'active'}
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="trial">Trial</option>
      </Select>
      
      {mode === 'add' && (
        <Input
          label="Temporary Password"
          name="password"
          type="password"
          placeholder="Enter temporary password"
          required
        />
      )}
    </form>
  );
};

export default UserForm;

