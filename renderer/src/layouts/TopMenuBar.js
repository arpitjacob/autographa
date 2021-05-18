import Link from 'next/link';
import { Fragment, useState } from 'react';
import {
 Disclosure, Menu, Dialog, Transition,
} from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import Notifications from '@/modules/notifications/Notifications';

const profile = ['Your Profile', 'Settings', 'Sign out'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TopMenuBar() {
  const [openSideBar, setOpenSideBar] = useState(false);

  function closeSideBars() {
    setOpenSideBar(false);
  }

  function openSideBars() {
    setOpenSideBar(true);
  }

  function closeNotifications(open) {
    setOpenSideBar(open);
  }

  return (
    <>
      <Disclosure as="nav" className="bg-secondary">
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">

                  <div className="hidden md:block">
                    <div className="-ml-4 flex items-baseline space-x-4">
                      <span className="text-white px-3 py-2 text-lg tracking-wide font-bold uppercase">
                        Autographa
                        <span className="text-primary font-extrabold"> 2.0</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      onClick={openSideBars}
                      type="button"
                      className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm
                        text-sm font-medium text-white bg-gray-800
                        hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700"
                    >
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {/* <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
                      <span className="px-2 ml-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-white">21</span>
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 border-4 border-white rounded-full flex items-center text-sm
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-700"
                            >
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item) => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <Link href="/profile">
                                      <a
                                        href="#profile"
                                        className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700',
                                      )}
                                      >
                                        {item}
                                      </a>
                                    </Link>
                                )}
                                </Menu.Item>
                            ))}
                            </Menu.Items>
                          </Transition>
                        </>
                    )}
                    </Menu>

                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </>
      )}
      </Disclosure>

      <Transition
        show={openSideBar}
        as={Fragment}
        enter="transform transition ease-in-out duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >

        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          // initialFocus={cancelButtonRef}
          static
          open={openSideBar}
          onClose={closeSideBars}
        >

          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <Notifications closeNotifications={closeNotifications}>
            notification
          </Notifications>

        </Dialog>
      </Transition>

    </>

  );
}
