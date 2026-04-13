import React, { useState } from 'react';
import { ToastProvider, useToast } from '@/components/ui/Toast';

// Import ALL 20 components
import Button, { ButtonGroup, IconButton } from '@/components/ui/Button';
import Input, { NumberInput, SearchInput } from '@/components/ui/Input';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import Checkbox from '@/components/ui/Checkbox';
import RadioButton, { RadioGroup } from '@/components/ui/RadioButton';
import DatePicker from '@/components/ui/DatePicker';
import TimePicker from '@/components/ui/TimePicker';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Accordion from '@/components/ui/Accordion';
import Chip, { ChipInput } from '@/components/ui/Chip';
import Modal, { ConfirmDialog, Drawer } from '@/components/ui/Modal';
import Badge, { NotificationBadge, StatusBadge } from '@/components/ui/Badge';
import { SkeletonText, SkeletonCard, SkeletonTable, SkeletonAvatar, SkeletonList } from '@/components/ui/Skeleton';
import { ControlledTabs } from '@/components/ui/Tabs';
import Alert, { InlineAlert, Banner } from '@/components/ui/Alert';
import Tooltip from '@/components/ui/Tooltip';
import Progress, { CircularProgress, SteppedProgress } from '@/components/ui/Progress';
import Breadcrumb from '@/components/ui/Breadcrumb';

import { 
  Settings, User, Bell, Mail, Lock, Home, Heart, Star, Calendar, Clock,
  Save, Upload, Download, Trash2, Edit, Plus, Search, X, Check,
  AlertCircle, Info, CheckCircle, AlertTriangle, Eye, Send, Share2,
  ChevronRight, Filter, RefreshCw, Copy, MessageCircle, ThumbsUp
} from 'lucide-react';

/**
 * ALL COMPONENTS SHOWCASE
 * Complete demonstration of all 20 components in one example
 */
const AllComponentsExample = () => {
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    website: '',
    age: 25,
    bio: '',
    country: null,
    skills: [],
    theme: 'light',
  });

  // Component state
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState(null);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chips, setChips] = useState(['React', 'TypeScript', 'Tailwind']);
  const [progress, setProgress] = useState(65);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ];

  const accordionItems = [
    {
      title: 'What is this library?',
      icon: <Heart className="w-5 h-5" />,
      content: 'A comprehensive collection of 20+ production-ready React components built with Tailwind CSS.',
    },
    {
      title: 'How do I use it?',
      icon: <Star className="w-5 h-5" />,
      content: 'Simply import the components you need and use them in your React application. All components are fully documented.',
    },
    {
      title: 'Is it accessible?',
      icon: <CheckCircle className="w-5 h-5" />,
      content: 'Yes! All components include ARIA labels, keyboard navigation, and screen reader support.',
    },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Success!', 'Form submitted successfully');
      console.log('Form Data:', formData);
    }, 2000);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      {showBanner && (
        <Banner
          type="info"
          message="🎉 Welcome to the Complete UI Components Library! 20+ components ready to use."
          action={<span className="underline cursor-pointer">Learn More</span>}
          dismissible
          onClose={() => setShowBanner(false)}
        />
      )}

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
        {/* ========== HEADER ========== */}
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                UI Components Library
              </h1>
              <p className="text-lg text-text-secondary">
                Complete showcase of 20 production-ready React components
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationBadge count={5} color="danger">
                <IconButton 
                  icon={<Bell className="w-5 h-5" />} 
                  variant="ghost"
                  aria-label="Notifications"
                />
              </NotificationBadge>
              
              <NotificationBadge dot color="success">
                <IconButton 
                  icon={<User className="w-5 h-5" />} 
                  variant="ghost"
                  aria-label="Profile"
                />
              </NotificationBadge>

              <IconButton 
                icon={<Settings className="w-5 h-5" />} 
                variant="ghost"
                aria-label="Settings"
              />
            </div>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/components' },
              { label: 'Showcase' },
            ]}
            separator="chevron"
          />

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="online" />
            <Badge variant="soft" color="success">v2.0.0</Badge>
            <Badge variant="outline" color="primary">20 Components</Badge>
            <Badge dot color="warning">Beta</Badge>
            <Badge pill color="info">Updated</Badge>
          </div>
        </header>

        {/* ========== BUTTONS ========== */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">1. Buttons</h2>
          
          <div className="card space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" leftIcon={<Save />}>Primary</Button>
                <Button variant="secondary" leftIcon={<Edit />}>Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger" leftIcon={<Trash2 />}>Danger</Button>
                <Button variant="success" leftIcon={<Check />}>Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xs">XS</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">XL</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Button States</h3>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Button Group & Icon Buttons</h3>
              <div className="space-y-3">
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Center</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
                
                <div className="flex gap-2">
                  <IconButton icon={<Heart />} aria-label="Like" variant="ghost" />
                  <IconButton icon={<Star />} aria-label="Favorite" variant="ghost" />
                  <IconButton icon={<Share2 />} aria-label="Share" variant="ghost" />
                  <IconButton icon={<Download />} aria-label="Download" variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== INPUTS ========== */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">2. Input Fields</h2>
          
          <div className="card space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                placeholder="John Doe"
                leftIcon={<User className="w-4 h-4" />}
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
              />

              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
                clearable
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                leftIcon={<Lock className="w-4 h-4" />}
                description="Must be at least 8 characters"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
              />

              <Input
                label="Website"
                type="url"
                placeholder="example"
                leftAddon="https://"
                rightAddon=".com"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
              />

              <NumberInput
                label="Age"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                min={1}
                max={120}
              />

              <SearchInput
                label="Search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={(query) => toast.info('Searching', `Query: ${query}`)}
              />
            </div>
          </div>
        </section>

        {/* ========== FORM COMPONENTS ========== */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">3-9. Form Components</h2>
          
          <div className="card">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Toggle Switch */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Toggle Switch</h3>
                <div className="flex flex-wrap gap-4">
                  <ToggleSwitch
                    checked={toggle}
                    onChange={setToggle}
                    label="Enable Notifications"
                    size="sm"
                  />
                  <ToggleSwitch
                    checked={toggle}
                    onChange={setToggle}
                    label="Dark Mode"
                    size="md"
                    variant="success"
                  />
                  <ToggleSwitch
                    checked={toggle}
                    onChange={setToggle}
                    label="Premium Features"
                    size="lg"
                    showIcons
                    variant="primary"
                  />
                </div>
              </div>

              {/* Checkbox */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Checkbox</h3>
                <div className="space-y-3">
                  <Checkbox
                    checked={checked}
                    onChange={setChecked}
                    label="Accept Terms and Conditions"
                    description="I agree to the terms and conditions"
                  />
                  <Checkbox
                    checked={indeterminate}
                    indeterminate={true}
                    onChange={() => setIndeterminate(!indeterminate)}
                    label="Select All (Indeterminate)"
                  />
                </div>
              </div>

              {/* Radio Button */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Radio Buttons</h3>
                <RadioGroup
                  name="theme"
                  value={selectedRadio}
                  onChange={setSelectedRadio}
                  options={[
                    { value: 'option1', label: 'Option 1', description: 'First choice' },
                    { value: 'option2', label: 'Option 2', description: 'Second choice' },
                    { value: 'option3', label: 'Option 3', description: 'Third choice' },
                  ]}
                />
              </div>

              {/* Date & Time Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  label="Select Date"
                  placeholder="Choose a date"
                />
                
                <TimePicker
                  value={selectedTime}
                  onChange={setSelectedTime}
                  label="Select Time"
                  format="12"
                />
              </div>

              {/* TextArea */}
              <TextArea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                label="Bio / Description"
                placeholder="Tell us about yourself..."
                rows={4}
                showCount
                maxLength={500}
                autoResize
              />

              {/* Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  options={countryOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  label="Country"
                  placeholder="Select country"
                  searchable
                />
                
                <Select
                  options={selectOptions}
                  value={multiSelectValue}
                  onChange={setMultiSelectValue}
                  label="Skills (Multi-select)"
                  placeholder="Choose frameworks"
                  multiple
                  searchable
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border-color">
                <Button type="submit" variant="primary" loading={loading} leftIcon={<Save />}>
                  Submit Form
                </Button>
                <Button type="button" variant="secondary" leftIcon={<RefreshCw />}>
                  Reset
                </Button>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* ========== DATA DISPLAY ========== */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">10-18. Data Display & Feedback</h2>
          
          {/* Toast */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Toast Notifications</h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Success!', 'Operation completed')} variant="success">
                Success Toast
              </Button>
              <Button onClick={() => toast.error('Error!', 'Something went wrong')} variant="danger">
                Error Toast
              </Button>
              <Button onClick={() => toast.warning('Warning!', 'Be careful')} variant="warning">
                Warning Toast
              </Button>
              <Button onClick={() => toast.info('Info', 'FYI')} variant="info">
                Info Toast
              </Button>
            </div>
          </div>

          {/* Accordion */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Accordion</h3>
            <Accordion items={accordionItems} variant="bordered" allowMultiple defaultOpen={[0]} />
          </div>

          {/* Chips */}
          <div className="card space-y-4">
            <h3 className="text-xl font-semibold">Chips / Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Chip label="Default" />
              <Chip label="Filled" variant="filled" color="primary" />
              <Chip label="Outlined" variant="outlined" color="success" />
              <Chip label="Deletable" variant="filled" onDelete={() => toast.info('Removed')} />
            </div>
            <ChipInput
              chips={chips}
              onChipsChange={setChips}
              placeholder="Type and press Enter"
              maxChips={10}
            />
          </div>

          {/* Badges */}
          <div className="card space-y-4">
            <h3 className="text-xl font-semibold">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="solid" color="primary">Solid</Badge>
              <Badge variant="soft" color="success">Soft</Badge>
              <Badge variant="outline" color="danger">Outline</Badge>
              <Badge dot color="success">With Dot</Badge>
              <Badge pill color="info">Pill</Badge>
              <StatusBadge status="online" />
              <StatusBadge status="pending" />
              <StatusBadge status="approved" />
            </div>
          </div>

          {/* Skeleton */}
          <div className="card space-y-6">
            <h3 className="text-xl font-semibold">Skeleton Loaders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SkeletonCard showImage showAvatar lines={3} />
              <SkeletonList items={3} />
            </div>
            <SkeletonTable rows={4} columns={4} showHeader />
          </div>

          {/* Tabs */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Tabs</h3>
            <ControlledTabs
              tabs={[
                { 
                  label: 'Profile', 
                  icon: <User className="w-4 h-4" />,
                  content: <div className="p-4">Profile content...</div> 
                },
                { 
                  label: 'Settings', 
                  icon: <Settings className="w-4 h-4" />,
                  content: <div className="p-4">Settings content...</div> 
                },
                { 
                  label: 'Messages', 
                  badge: 3,
                  content: <div className="p-4">Messages content...</div> 
                },
              ]}
              variant="pills"
              defaultTab={0}
            />
          </div>

          {/* Alerts */}
          <div className="card space-y-3">
            <h3 className="text-xl font-semibold">Alerts</h3>
            <Alert type="success" title="Success" message="Operation completed successfully." dismissible />
            <Alert type="error" title="Error" message="Something went wrong." dismissible />
            <Alert type="warning" title="Warning" message="Please review your input." variant="left-accent" />
            <Alert type="info" message="This is an info alert" variant="soft" />
            <InlineAlert type="error" message="Inline error message" />
          </div>

          {/* Progress */}
          <div className="card space-y-6">
            <h3 className="text-xl font-semibold">Progress Indicators</h3>
            
            <div className="space-y-4">
              <Progress value={progress} showLabel label="Upload Progress" variant="gradient" />
              <Progress value={75} variant="striped" color="success" />
              <Progress value={90} variant="animated" color="warning" />
              
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <CircularProgress value={75} color="primary" label="CPU" />
              <CircularProgress value={60} color="success" label="Memory" size={100} />
              <CircularProgress value={90} color="danger" label="Storage" size={80} />
            </div>

            <SteppedProgress
              steps={['Account', 'Profile', 'Settings', 'Complete']}
              currentStep={currentStep}
              color="primary"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>Previous</Button>
              <Button size="sm" onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>Next</Button>
            </div>
          </div>

          {/* Tooltips */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Tooltips</h3>
            <div className="flex flex-wrap gap-4">
              <Tooltip content="Top tooltip" position="top">
                <Button variant="outline">Hover Top</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" position="right">
                <Button variant="outline">Hover Right</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="outline">Hover Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" position="left">
                <Button variant="outline">Hover Left</Button>
              </Tooltip>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Breadcrumb</h3>
            <Breadcrumb
              items={[
                { label: 'Products', href: '/products' },
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Laptops' },
              ]}
              separator="chevron"
            />
          </div>
        </section>

        {/* ========== MODALS ========== */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-text-primary">19-20. Modals & Drawers</h2>
          
          <div className="card">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setIsModalOpen(true)} leftIcon={<Eye />}>
                Open Modal
              </Button>
              <Button onClick={() => setIsDrawerOpen(true)} variant="secondary" leftIcon={<Settings />}>
                Open Drawer
              </Button>
              <Button onClick={() => setIsConfirmOpen(true)} variant="danger" leftIcon={<Trash2 />}>
                Confirm Dialog
              </Button>
            </div>
          </div>
        </section>

        {/* Modals */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => {
                toast.success('Saved!');
                setIsModalOpen(false);
              }}>Save</Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-text-secondary">Modal with form elements inside.</p>
            <Input label="Name" placeholder="Enter name" />
            <TextArea label="Message" placeholder="Enter message" rows={3} />
          </div>
        </Modal>

        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Drawer Example"
          position="right"
          size="md"
        >
          <div className="space-y-4">
            <Input label="Name" placeholder="Enter name" />
            <Input label="Email" type="email" placeholder="Enter email" />
            <Select options={countryOptions} label="Country" />
            <Button fullWidth variant="primary" leftIcon={<Save />}>Save</Button>
          </div>
        </Drawer>

        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            toast.success('Deleted!');
            setIsConfirmOpen(false);
          }}
          title="Delete Item"
          message="Are you sure? This action cannot be undone."
          variant="danger"
        />

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border-color">
          <p className="text-text-secondary mb-3">
            Complete UI Components Library • 20 Components • Built with React & Tailwind CSS
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="soft" color="primary">v2.0.0</Badge>
            <Badge variant="soft" color="success">Production Ready</Badge>
            <Badge variant="soft" color="info">MIT License</Badge>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Wrap with ToastProvider
const App = () => (
  <ToastProvider position="top-right" maxToasts={3}>
    <AllComponentsExample />
  </ToastProvider>
);

export default App;