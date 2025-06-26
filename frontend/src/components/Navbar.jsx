import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SparklesIcon, 
  ChevronLeftIcon,
  HomeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
  { name: 'Create Resume', href: '/create', icon: DocumentTextIcon },
  { name: 'My Resumes', href: '/resumes', icon: ClipboardDocumentListIcon },
  { name: 'Templates', href: '/templates', icon: DocumentTextIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { user } = useAuth();
  const [isAIMenuOpen, setIsAIMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* AI Assistant Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${
          isAIMenuOpen ? 'w-64' : 'w-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <button
                onClick={() => setIsAIMenuOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <Link
                to="/ai-assistant"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => setIsAIMenuOpen(false)}
              >
                <SparklesIcon className="h-5 w-5 mr-2 text-primary-600" />
                Chat with AI
              </Link>
              <Link
                to="/templates"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={() => setIsAIMenuOpen(false)}
              >
                <DocumentTextIcon className="h-5 w-5 mr-2 text-primary-600" />
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  {/* AI Assistant Toggle Button */}
                  <button
                    onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
                    className="inline-flex items-center px-4 py-2 mr-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    <span>AI Assistant</span>
                  </button>
                  <div className="flex-shrink-0">
                    <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                      AI Resume
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'border-primary-500 text-primary-700'
                            : 'border-transparent text-gray-500 hover:border-primary-300 hover:text-gray-700'
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-1" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* User menu - enhanced with more options */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:bg-gray-50 transition-colors">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 font-medium">
                            {user?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <UserIcon className="h-4 w-4 mr-3" />
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <Cog6ToothIcon className="h-4 w-4 mr-3" />
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/resumes"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <ClipboardDocumentListIcon className="h-4 w-4 mr-3" />
                              My Resumes
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/templates"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <DocumentTextIcon className="h-4 w-4 mr-3" />
                              Templates
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/ai-assistant"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <SparklesIcon className="h-4 w-4 mr-3" />
                              AI Assistant
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <Disclosure.Button
                  as="button"
                  onClick={() => setIsAIMenuOpen(!isAIMenuOpen)}
                  className="flex w-full items-center px-4 py-2 text-base font-medium text-primary-600 hover:bg-gray-100"
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  AI Assistant
                </Disclosure.Button>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={`flex items-center border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-transparent text-gray-500 hover:border-primary-300 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {user?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name || 'Anonymous User'}</div>
                    <div className="text-sm font-medium text-gray-500">Anonymous Mode</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/settings"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/resumes"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                    My Resumes
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/templates"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Templates
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/ai-assistant"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    AI Assistant
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
} 