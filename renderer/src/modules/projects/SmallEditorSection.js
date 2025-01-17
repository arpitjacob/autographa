import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { ReferenceContext } from '@/components/context/ReferenceContext';
import ResourcesPopUp from '../../components/EditorPage/Reference/ResourcesPopUp';

export default function EditorSectionSmall({ title, children }) {
const [content, setContent] = useState(true);
const {
  state: {
    openResource,
    openResourcePopUp,
  },
  actions: {
    setOpenResource,
    setOpenResourcePopUp,
  },
} = useContext(ReferenceContext);

const removeSection = () => {
  setOpenResource(!openResource);
};

const sectionContent = () => {
  setContent(!content);
};

const showResourcesPanel = () => {
  setOpenResourcePopUp(true);
};

  return (
    <div className={`${openResource && 'hidden'}`}>

      <div className="border shadow  border-gray-50 rounded relative group">
        {
        content
      && (
      <img
        className="absolute bottom-0 -right-px invisible  group-hover:visible"
        src="/illustrations/add-section.svg"
        alt=""
      />
      )
      }
        <div className="bg-gray-200 rounded-t border text-center text-gray-600 relative">
          {openResourcePopUp

        && (
        <div className=" absolute z-50 ">

          <ResourcesPopUp />

        </div>
          )}
          <div className="flex bg-gray-300  absolute h-full -right-px rounded-tr invisible  group-hover:visible ">
            <button onClick={showResourcesPanel} type="button">

              <img
                src="/illustrations/settings-small.svg"
                alt="/"
                className="py-2 px-2"
              />
            </button>
            <button
              onClick={sectionContent}
              type="button"
            >

              <img
                className="px-2 py-2"
                src="/illustrations/minimize.svg"
                alt=""
              />
            </button>
            <button type="button" onClick={removeSection}>
              <img
                src="/illustrations/small-close-button.svg"
                alt=""
              />
            </button>
          </div>
          <div className="uppercase text-xs tracking-widest font-medium py-2">
            { title }
          </div>
        </div>
        { content

        && (
        <div style={{ height: '500px' }} className="overflow-scroll p-3">
          { children }
        </div>
)}
      </div>
    </div>
  );
}

EditorSectionSmall.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
