/* eslint-disable import/no-unresolved */
import { StarIcon } from '@heroicons/react/outline';
import React, { useContext, useEffect, useState } from 'react';
import { ReferenceContext } from '@/components/context/ReferenceContext';
import * as localforage from 'localforage';
import { isElectron } from '@/core/handleElectron';
import { readRefMeta } from '@/core/reference/readRefMeta';
import { readRefBurrito } from '@/core/reference/readRefBurrito';
import ResourceOption from './ResourceOption';

function createData(name, language, date) {
    return {
   name, language, date,
  };
}
const translationNotes = [
    createData('English Notes', 'en', '2021-02-05'),
    createData('Hindi Translation Notes', 'hi', '2021-02-11'),
    createData('Bengali', 'bn', '2021-02-25'),
    createData('Malayalam', 'ml', '2020-12-31'),
    createData('Gujrati Notes', 'gu', '2020-12-29'),
];

const ResourcesPopUp = () => {
    const [subMenuItems, setSubMenuItems] = useState();
    const {
        state: {
            selectedResource,
            openResourcePopUp,
        },
        actions: {
            setLanguageId,
            SetSelectedResource,
            setRefName,
            setOpenResourcePopUp,
        },
      } = useContext(ReferenceContext);
    const [selectResource, setSelectResource] = useState(selectedResource);

    useEffect(() => {
        SetSelectedResource(selectResource);
        if (isElectron()) {
            const parseData = [];
            readRefMeta({
              projectname: 'newprodir',
            }).then((refs) => {
              refs.forEach((ref) => {
                readRefBurrito({
                  projectname: 'newprodir',
                  filename: ref,
                }).then((data) => {
                    if (data) {
                        parseData.push(JSON.parse(data));
                          localforage.setItem('refBibleBurrito', parseData).then(
                            () => localforage.getItem('refBibleBurrito'),
                            ).then((res) => {
                                setSubMenuItems(res);
                            }).catch((err) => {
                              // we got an error
                              throw err;
                            });
                    }
                });
              });
            });
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeSection = () => {
        setOpenResourcePopUp(false);
    };

    const handleRowSelect = (e, row, name) => {
        SetSelectedResource(selectResource);
        setLanguageId(row);
        setRefName(name);
        removeSection();
    };

    return (
      <div className="absolute">
        <div className={`${openResourcePopUp === false && 'hidden'} flex relative rounded shadow overflow-hidden bg-white`}>
          <button onClick={removeSection} type="button" className="absolute z-10 -right-0">
            <img
              src="/illustrations/close-button-black.svg"
              alt="/"
            />
          </button>
          <div>
            <div className="uppercase bg-secondary  text-white py-2 px-2 text-xs tracking-widest leading-snug rounded-tl text-center">Resources</div>
            <div className="bg-gray-100 px-3 py-3 h-full">
              <input
                className="rounded h-8 bg-gray-200 border-none uppercase pr-6 text-xs tracking-widest leading-snug font-bold text-secondary"
                placeholder="Search"
                type="search"
                id="gsearch"
                name="gsearch"
              />
              <div className=" grid grid-rows-5 px-5 py-5 gap-6">
                <ResourceOption imageUrl="/illustrations/dictionary-icon.svg" id="tn" text="Notes" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
                <ResourceOption imageUrl="/illustrations/image-icon.svg" id="img" text="Image" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
                <ResourceOption imageUrl="/illustrations/location-icon.svg" id="map" text="Map" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
                <ResourceOption imageUrl="/illustrations/dialogue-icon.svg" id="cmtry" text="Commentary" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
                <ResourceOption imageUrl="/illustrations/bible-icon.svg" id="bible" text="Bible" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
                <ResourceOption imageUrl="/illustrations/dialogue-icon.svg" id="tq" text="Questions" setSelectResource={setSelectResource} setSubMenuItems={setSubMenuItems} />
              </div>
            </div>
          </div>
          <div className="w-full relative overflow-hidden">
            <table className="divide-y divide-gray-200 w-full">
              <thead className="bg-white">
                <tr className="">
                  <th
                    className=" py-3 text-left text-xs font-medium text-gray-300 pl-10"
                  >
                    <StarIcon className="h-5 w-5" aria-hidden="true" />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>

              {selectResource === 'tn' && (
                <tbody className="bg-white divide-y divide-gray-200">
                  {translationNotes.map((notes) => (
                    <tr className="hover:bg-gray-200" key={notes.name}>
                      <td className="pl-10">
                        {' '}
                        <StarIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                      </td>
                      <td
                        className="px-5 py-6 text-left text-gray-600"
                      >
                        <div
                          onClick={(e) => handleRowSelect(e, notes.language)}
                          role="button"
                          tabIndex="0"
                        >
                          {notes.name}
                        </div>
                      </td>
                      <td className="text-gray-600  text-left">
                        <div
                          onClick={(e) => handleRowSelect(e, notes.language)}
                          role="button"
                          tabIndex="0"
                        >
                          {notes.language}
                        </div>
                      </td>
                    </tr>
                ))}
                </tbody>
              )}
              {selectResource === 'bible' && (
              <tbody className="bg-white divide-y divide-gray-200">
                {(subMenuItems) && (
                    subMenuItems.map((ref) => (
                      <tr className="hover:bg-gray-200" key={ref.identification.name.en}>
                        <td className="pl-10">
                          {' '}
                          <StarIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                        </td>
                        <td
                          className="px-5 py-6 text-left text-gray-600"
                        >
                          <div
                            onClick={(e) => handleRowSelect(e,
                            ref.languages[0].tag, ref.identification.abbreviation.en)}
                            role="button"
                            tabIndex="0"
                          >
                            {ref.identification.name.en}
                          </div>
                        </td>
                        <td className="text-gray-600  text-left">
                          <div
                            onClick={(e) => handleRowSelect(e,
                            ref.languages[0].tag, ref.identification.abbreviation.en)}
                            role="button"
                            tabIndex="0"
                          >
                            {ref.languages[0].name.en}
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
              )}
            </table>
            <div className="flex gap-6 mt-32 mb-5 ml-52 mr-10  justify-end">
              <button type="button" className="py-2 px-6 bg-primary rounded shadow text-white uppercase text-xs tracking-widest font-semibold">Upload</button>
              <button type="button" className="py-2 px-6 rounded shadow bg-error text-white uppercase text-xs tracking-widest font-semibold">Cancel</button>
              <button type="button" className="py-2 px-7 rounded shadow bg-success text-white uppercase text-xs tracking-widest font-semibold">Open</button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default ResourcesPopUp;
