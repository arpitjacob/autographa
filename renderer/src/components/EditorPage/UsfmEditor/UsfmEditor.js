/* eslint-disable react-hooks/exhaustive-deps */
import { ProjectContext } from '@/components/context/ProjectContext';
import { ReferenceContext } from '@/components/context/ReferenceContext';
import React, {
 useContext, useEffect, useRef, useState, useMemo,
 useCallback,
} from 'react';
import * as localforage from 'localforage';
import {
 createBasicUsfmEditor,
 withChapterPaging,
//  withChapterSelection,
 withToolbar,
} from 'usfm-editor';
import { readFile } from '../../../core/editor/readFile';
import writeToParse from '../../../core/editor/writeToParse';
import { isElectron } from '../../../core/handleElectron';
import writeToFile from '../../../core/editor/writeToFile';
// import InputSelector from './InputSelector';
import fetchFromParse from '../../../core/editor/fetchFromParse';
import findBookFromParse from '../../../core/editor/findBookFromParse';
import EditorSection from '../EditorSection';

const UsfmEditor = () => {
  const intervalRef = useRef();
  const [usfmInput, setUsfmInput] = useState();
  const [readOnly] = useState(false);
  const [activeTyping, setActiveTyping] = useState(false);
  const [identification, setIdentification] = useState({});
  const [goToVersePropValue, setGoToVersePropValue] = useState({});
  const username = 'Michael';
  const projectName = 'Spanish Pro';
  const {
    state: {
      bookId,
      verse,
      chapter,
    },
    actions: {
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
    },
  } = useContext(ReferenceContext);
  const {
    states: {
      selectedProject,
    },
   } = useContext(ProjectContext);

   const CustomEditor = useMemo(
    () => withToolbar((withChapterPaging(createBasicUsfmEditor()))),
    [usfmInput],
    );

   const saveToParse = async () => {
      try {
        const usfm = await localforage.getItem('editorData');
        writeToParse({
          username, projectName, usfmData: usfm, scope: bookId.toUpperCase(), write: true,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

  const handleEditorChange = (usfm) => {
    if (isElectron()) {
      writeToFile({
        projectname: selectedProject,
        filename: bookId,
        data: usfm,
      });
    } else {
      localforage.setItem('editorData', usfm).then(
        () => localforage.getItem('editorData'),
        ).then(() => {
          setActiveTyping(true);
        }).catch((err) => {
          // we got an error
          throw err;
        });
    }
  };

  // handle on active state change
  useEffect(() => {
    if (activeTyping) {
      intervalRef.current = setInterval(() => {
        saveToParse();
        setActiveTyping(false);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [activeTyping]);

  // handle unmount
  useEffect(() => {
    localStorage.setItem('_tabhistory', 'Editor');
    const intervalId = intervalRef.current;
      return () => {
        clearInterval(intervalId);
      };
  }, []);

  const handleInputChange = (usfm) => {
    setUsfmInput(usfm);
    setIdentification({});
  };

  const handleVersChange = useCallback(
    (val) => {
    if (val) {
       onChangeChapter(val.chapter.toString());
       onChangeVerse(val.verseStart.toString());
    }
  }, [onChangeChapter, onChangeVerse],
  );

  const onIdentificationChange = useCallback(
    (id) => {
    const identification = typeof id === 'string' ? JSON.parse(id) : id;
    setIdentification(identification);
    onChangeBook((identification.id).toLowerCase());
    },
    [bookId],
  );

  useEffect(() => {
    if (!isElectron()) {
      findBookFromParse({
        username, projectName, scope: bookId.toUpperCase(),
      }).then((scopefiles) => {
        scopefiles.forEach((file) => {
          if (file === bookId.toUpperCase()) {
            fetchFromParse({
            username, projectName, scope: bookId.toUpperCase(),
            }).then(async (data) => {
              if (data) {
                localforage.setItem('editorData', data).then(
                  () => localforage.getItem('editorData'),
                  ).then(() => {
                    handleInputChange(data);
                  }).catch((err) => {
                    // we got an error
                    throw err;
                  });
              }
            });
          } else {
            handleInputChange(undefined);
          }
        });
      });
    } else {
       readFile({
        projectname: selectedProject,
        filename: bookId,
      }).then((data) => {
        if (data) {
          localforage.setItem('editorData', data).then(
            () => localforage.getItem('editorData'),
            ).then(() => {
              handleInputChange(data);
            }).catch((err) => {
              // we got an error
              throw err;
            });
        }
      });
    }
  }, [bookId, chapter]);

  useEffect(() => {
    if (!isElectron()) {
    fetchFromParse({
      username, projectName, scope: bookId.toUpperCase(),
    }).then((data) => {
      if (data) {
        localforage.setItem('editorData', data).then(
          () => localforage.getItem('editorData'),
          ).then(() => {
            handleInputChange(data);
          }).catch((err) => {
            // we got an error
            throw err;
          });
      }
      });
    } else {
      readFile({
        projectname: selectedProject,
        filename: bookId,
      }).then((data) => {
        if (data) {
          localforage.setItem('editorData', data).then(
            () => localforage.getItem('editorData'),
            ).then(() => {
              handleInputChange(data);
            }).catch((err) => {
              // we got an error
              throw err;
            });
        }
      });
    }
  }, []);

  useEffect(() => {
    setGoToVersePropValue({
          chapter: parseInt(chapter, 10),
          verse: parseInt(verse, 10),
          key: Date.now(),
      });
  }, [chapter]);

return (
  <>
    <span style={{
      float: 'right', left: '-6px', top: '-404px', paddingRight: '2px',
    }}
    >
      <EditorSection header="USFM EDITOR" editor>
        {usfmInput && (
        <CustomEditor
          usfmString={usfmInput}
          key={usfmInput}
          onChange={handleEditorChange}
          onVerseChange={handleVersChange}
          goToVerse={goToVersePropValue}
          readOnly={readOnly}
          identification={identification}
          onIdentificationChange={onIdentificationChange}
        />
        )}
      </EditorSection>
    </span>
  </>
);
};

export default UsfmEditor;
