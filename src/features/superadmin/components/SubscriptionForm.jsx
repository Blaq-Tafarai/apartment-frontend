import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SubscriptionForm = ({ defaultValues, mode, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.amount = parseFloat(data.amount);
    onSubmit(data);
  };

  return (
    <form id="subscription-form" onSubmit={handleSubmit} className="space-y-4">
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
      </Select>
      
      <Select
        label="Plan"
        name="plan"
        defaultValue={defaultValues?.plan || ''}
        required
      >
        <option value="">Select Plan</option>
        <option value="Basic">Basic - $29/month</option>
        <option value="Professional">Professional - $99/month</option>
        <option value="Enterprise">Enterprise - $299/month</option>
      </Select>
      
      <Select
        label="Billing Cycle"
        name="billingCycle"
        defaultValue={defaultValues?.billingCycle || 'monthly'}
        required
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>
      
      <Input
        label="Amount"
        name="amount"
        type="number"
        step="0.01"
        defaultValue={defaultValues?.amount || ''}
        placeholder="0.00"
        required
      />
      
      <Input
        label="Start Date"
        name="startDate"
        type="date"
        defaultValue={defaultValues?.startDate || ''}
        required
      />
      
      <Select
        label="Status"
        name="status"
        defaultValue={defaultValues?.status || 'active'}
        required
      >
        <option value="active">Active</option>
        <option value="trial">Trial</option>
        <option value="cancelled">Cancelled</option>
      </Select>
      
      <Select
        label="Payment Method"
        name="paymentMethod"
        defaultValue={defaultValues?.paymentMethod || 'Credit Card'}
      >
        <option value="Credit Card">Credit Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="PayPal">PayPal</option>
      </Select>
    </form>
  );
};

export default SubscriptionForm;

