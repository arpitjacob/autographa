import ProjectsLayout from '@/layouts/ProjectsLayout';
import React from 'react';
import { Popover } from '@headlessui/react';
import PropTypes from 'prop-types';
import CustomAutocomplete from './CustomAutocomplete';

const langauges = [
  { title: 'English' },
  { title: 'Zulu' },
  { title: 'Wolof' },
  { title: 'Mende' },
  { title: 'Kiswahili' }];

  function TargetLanguageTag(props) {
      const { children } = props;
      return (
        <div className="rounded-full px-3 py-1  bg-gray-200 text-xs uppercase font-semibold">{children}</div>
      );
  }

function BookNumberTag(props) {
    const { children } = props;

    return (
      <div className="rounded-full  px-3 py-1 bg-gray-200 text-xs uppercase font-semibold">
        <div className="flex">

          <span>
            {' '}
            {children}
            {' '}
            <span> books</span>
          </span>

        </div>
      </div>
    );
}

function LicencePopover() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="min-w-full">
            <img
              className=""
              src="illustrations/add-button.svg"
              alt="add button"
            />
          </Popover.Button>
          <Popover.Overlay
            className={`${
              open ? 'opacity-30 fixed inset-0' : 'opacity-0'
            } bg-black`}
          />
          <Popover.Panel className="absolute z-20 bg-white rounded-md right-5 -bottom-24">
            <div className="m-5">
              <div className="">
                <h2 className="uppercase font-bold leading-5 tracking-widest ">new license</h2>
              </div>
              <div className="mt-8 mb-10">
                <input className="bg-gray-200 w-96 block rounded shadow-sm sm:text-sm focus:border-primary border-gray-300 h-10" />
              </div>
              <div>
                <textarea className="h-60 border rounded border-gray-300 bg-gray-200 w-96" />
              </div>
              <div className="mt-3 content-start">
                <Popover.Button className="mr-5 bg-error w-28 h-8 border-color-error rounded uppercase shadow text-white text-xs tracking-wide leading-4 font-light"> cancel</Popover.Button>
                <button type="button" className=" bg-success w-28 h-8 border-color-success rounded uppercase text-white text-xs shadow">
                  create
                </button>
              </div>

            </div>
          </Popover.Panel>
        </>
        )}
    </Popover>
  );
}

function TargetLanguagePopover() {
  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <Popover.Button>
            <img
              className=" w-10 h-10"
              src="illustrations/add-button.svg"
              alt="add button"
            />

          </Popover.Button>
          <Popover.Overlay
            className={`${
              open ? 'opacity-30 fixed inset-0' : 'opacity-0'
            } bg-black`}
          />

          <Popover.Panel className="absolute z-20 bottom-36 right-8">
            <div className="  h-80 rounded shadow border border-gray-200 bg-white">
              <div className="grid grid-rows-2 gap-5 m-8">
                <div>
                  <h2 className="uppercase font-bold leading-5 tracking-widest mb-5 ">new langauge</h2>
                  <div>
                    <input
                      type="text"
                      name="search_box"
                      id="search_box"
                      autoComplete="given-name"
                      className="bg-gray-200 w-80 block rounded shadow-sm sm:text-sm focus:ring-gray-500 focus:border-primary border-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-xs font-base  text-primary tracking-wide leading-4 font-light">Script Direction</h3>
                  <div>
                    <div className=" mb-3">
                      <input type="radio" className="form-radio h-4 w-4 text-primary" />
                      <span className=" ml-3 text-xs font-bold">LTR</span>
                    </div>
                    <div>
                      <input type="radio" className="form-radio h-4 w-4 text-primary" />
                      <span className=" ml-3 text-xs font-bold">RTL</span>
                    </div>
                  </div>
                </div>
                <div className="ml-16">
                  <Popover.Button className="mr-5 bg-error w-28 h-8 border-color-error rounded uppercase shadow text-white text-xs tracking-wide leading-4 font-light"> cancel</Popover.Button>
                  <button
                    type="button"
                    className=" bg-success w-28 h-8 border-color-success rounded uppercase text-white text-xs shadow"
                    onClick=""
                  >
                    create
                  </button>
                </div>

              </div>
            </div>
          </Popover.Panel>
        </>
       )}
    </Popover>
  );
}

function AdvancedSettingsDropdown() {
  const [isShow, setIsShow] = React.useState(true);

  const handleClick = () => {
    setIsShow(!isShow);
  };

  return (
    <div>
      <button
        className="min-w-max flex justify-between pt-3 shadow tracking-wider leading-none h-10 w-2/3 px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
        onClick={handleClick}
        type="button"
      >
        <h3>Advanced Settings</h3>
        <img
          className="justify-self-end mt-1"
          src="illustrations/arrow-down.svg"
          alt=""
        />
      </button>
      {!isShow
        && (
        <div>
          <div className="flex gap-5 mt-8">
            <CustomAutocomplete label="Versification Scheme" list={langauges} />
            <button
              className="mt-5 min-w-max"
              type="button"
              label="na"
            >
              <img
                src="illustrations/add-button.svg"
                alt="add button"
              />
            </button>
          </div>
          <div className="flex relative gap-5 mt-5">
            <div className="absolute left-72 ml-4">
              <BookNumberTag>
                68
              </BookNumberTag>
            </div>

            <CustomAutocomplete label="Canon Specificationse" list={langauges} />
            <button
              className="mt-5 flex-shrink-0"
              type="button"
              label="na"
            >
              <img
                className="min-w-10"
                src="illustrations/add-button.svg"
                alt="add button"
              />
            </button>
            <button
              className="mt-5 flex-shrink-0"
              type="button"
              label="na"
            >
              <img
                className=" w-10 h-10"
                src="illustrations/edit.svg"
                alt="add button"
              />
            </button>
          </div>
          <div className="flex gap-5 mt-5">
            <CustomAutocomplete label="Licence" list={langauges} />
            <div className="mt-8 w-8 min-w-max">
              <LicencePopover />
            </div>
          </div>
        </div>
)}
    </div>

  );
}

function BibleHeaderTagDropDown() {
    return (

      <button type="button" className="flex text-white ml-5 font-bold text-xs px-3 py-2 rounded-full leading-3 tracking-wider uppercase bg-primary">
        <div>Bible</div>
        <img
          className=" w-3 h-3 ml-2"
          src="illustrations/down-arrow.svg"
          alt="down arrow"
        />
      </button>
        );
}

  export default function NewProject() {
      return (
        <ProjectsLayout
          title="new project"
          header={BibleHeaderTagDropDown()}
        >
          <div className="h-screen rounded border shadow mt-4 ml-5 mr-5 mb-5 ">
            <div className="grid grid-cols-2 m-5">
              <div className="overflow-auto">
                <div className="grid grid-row-5 gap-10 m-8 w-full">
                  <div>
                    <h4 className="text-xs font-base mb-2 text-primary  tracking-wide leading-4  font-light">Project Name</h4>
                    <input
                      type="text"
                      name="project_name"
                      id=""
                      className="bg-gray-200 w-80 block rounded shadow-sm sm:text-sm focus:ring-gray-500 focus:border-primary border-gray-300"
                    />
                  </div>
                  <div className="flex gap-8">
                    <input
                      type="text"
                      name="version"
                      id=""
                      className="bg-white w-80 block rounded shadow-sm sm:text-sm focus:ring-gray-500 focus:border-primary border-gray-300"
                    />
                    <input
                      type="text"
                      name="version_abbreviated"
                      id=""
                      className="bg-white w-20 block rounded  sm:text-sm focus:ring-gray-500 focus:border-primary border-gray-300"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-base mb-2 text-primary leading-4 tracking-wide  font-light">Description</h4>
                    <textarea
                      type="text"
                      name="Description"
                      id=""
                      className="bg-white w-80 h-28  block rounded shadow-sm sm:text-sm focus:ring-gray-500 focus:border-primary border-gray-300"
                    />
                  </div>
                  <div className=" relative flex gap-5">
                    <div className=" absolute left-80 ml-4">

                      <TargetLanguageTag>
                        LTR
                      </TargetLanguageTag>
                    </div>
                    <CustomAutocomplete label="Target Langauge" list={langauges} />
                    <div className=" mt-8">
                      <TargetLanguagePopover />
                    </div>
                  </div>
                  <button type="button" className="w-40 h-10  bg-success leading-loose rounded shadow text-xs font-base  text-white tracking-wide  font-light uppercase">Create Project</button>
                </div>
              </div>
              <div className="overflow-auto ">
                <div className="m-10">
                  <AdvancedSettingsDropdown />
                </div>

              </div>
            </div>
          </div>

        </ProjectsLayout>
      );
}

TargetLanguageTag.propTypes = {
    children: PropTypes.string,
};

BookNumberTag.propTypes = {
    children: PropTypes.number,
};
