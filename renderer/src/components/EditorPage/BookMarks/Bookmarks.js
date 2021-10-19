import { ReferenceContext } from '@/components/context/ReferenceContext';
import { useContext, useEffect, useState } from 'react';

export default function Bookmarks() {
  const {
    state: {
      bookmarksVerses,
      bookList,
      chapter,
      bookName,
    },
    actions: {
      onChangeBook,
      onChangeChapter,
      onChangeVerse,
    },
  } = useContext(ReferenceContext);

  // eslint-disable-next-line no-unused-vars
  const [tempBook, setTempBook] = useState();
  const [tempChapter, setTempChapter] = useState(chapter);

  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const gotoChapter = (bookname,
    chapterNum) => {
        bookList.forEach(async (book) => {
            if (bookname === book.name) {
              if (bookName !== book.key || chapter !== chapterNum) {
                  setTempBook(book.key);
                  onChangeBook(book.key);
                  setTempChapter(chapterNum);
                  onChangeVerse('1');
              }
            }
        });
  };

  useEffect(() => {
    timeout(3000).then(async () => {
        onChangeChapter(tempChapter);
        onChangeVerse('1');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempChapter]);

  return (
    <>
      <div className="bg-gray-800 uppercase text-white text-xs p-2 tracking-wider">
        Bookmarks
      </div>
      <div className="overflow-y-auto h-full no-scrollbars">
        {bookmarksVerses.map((bookmark) => (
          <div
            role="button"
            tabIndex="0"
            onClick={() => { gotoChapter(bookmark.bookname, bookmark.chapter); }}
            key={bookmark.bookname + bookmark.chapter}
            className="flex justify-between items-center hover:bg-gray-400 bg-gray-200 p-2 pr-5 text-sm font-semibold tracking-wider border-b border-gray-300 shadow-sm"
          >
            {bookmark.bookname}
            {' '}
            {bookmark.chapter}
          </div>
        ))}
      </div>
    </>
  );
}
