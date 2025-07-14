

// import React, { useEffect, useRef } from 'react';
// import { PageFlip } from 'page-flip';
// import { Clock } from 'lucide-react';

// const BookPost = ({ post }) => {
//   const bookRef = useRef(null);
//   const charsPerPage = 500;
//   const pages = [];
//   const content = post.content || '';

//   for (let i = 0; i < content.length; i += charsPerPage) {
//     let chunk = content.substring(i, i + charsPerPage);
//     if (chunk.length > 100) {
//       chunk = chunk.replace(/\b(\w+\b)/, (match) => match + ' ' + getRandomEmoji());
//     }
//     pages.push(chunk);
//   }

//   function getRandomEmoji() {
//     const emojis = ['📖', '✨', '💡', '🌟', '🎯', '🚀', '💭', '🔥', '⭐', '🎨'];
//     return emojis[Math.floor(Math.random() * emojis.length)];
//   }

//   useEffect(() => {
//     if (bookRef.current) {
//       const flipBook = new PageFlip(bookRef.current, {
//         width: 340,
//         height: 460,
//         size: 'fixed',
//         maxShadowOpacity: 0,
//         drawShadow: false,
//         showCover: true,
//         mobileScrollSupport: false,
//         useMouseEvents: true,
//         flippingTime: 800,
//       });

//       flipBook.loadFromHTML(document.querySelectorAll('.page'));
//     }
//   }, []);

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'flex-start',
//       alignItems: 'flex-start',
//       height: '100vh',
//       width: '100%',
//       paddingLeft: '8vw',
//       paddingRight: '4vw',
//       paddingTop: '5px',
//       marginTop: '60px',
//     }}>
//       <div id="flipbook" ref={bookRef}>
//         {/* Cover page */}
//         <div className="page">
//           <div className="page-inner">
//             <h2 style={{ textAlign: 'center' }}>📘 Book of Thoughts</h2>
//             <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
//               Turn the page to explore wisdom and wonder ✨
//             </p>
//           </div>
//         </div>

//         {/* Author page */}
//         <div className="page">
//           <div className="page-inner">
//             {post.image && (
//               <img
//                 src={post.image}
//                 alt="Author"
//                 style={{
//                   width: '100%',
//                   height: '140px',
//                   objectFit: 'cover',
//                   borderRadius: '12px',
//                   marginBottom: '1rem',
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                 }}
//               />
//             )}
//             <h3>{post.author?.name || 'Anonymous'}</h3>
//             <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
//               <Clock size={14} style={{ verticalAlign: 'middle' }} />{' '}
//               {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//             <p style={{ marginTop: '1rem' }}>
//               Discover wisdom, inspiration, and creativity hidden in every page. 📖
//             </p>
//             <p className="page-number">Page 1</p>
//           </div>
//         </div>

//         {/* Title + first content chunk */}
//         <div className="page">
//           <div className="page-inner">
//             {post.category && (
//               <span className="category-badge">{post.category}</span>
//             )}
//             <h2>{post.title}</h2>
//             <p>{pages[0]}</p>
//             <p className="page-number">Page 2</p>
//           </div>
//         </div>

//         {/* Remaining pages */}
//         {pages.slice(1).map((text, i) => (
//           <div className="page" key={i}>
//             <div className="page-inner">
//               <p>{text}</p>
//               <p className="page-number">Page {i + 3}</p>
//             </div>
//           </div>
//         ))}

//         {/* End page */}
//         <div className="page">
//           <div className="page-inner" style={{ textAlign: 'center' }}>
//             <h3>📚 The End</h3>
//             <p>Thank you for reading. Keep turning pages in life. 🌟</p>
//           </div>
//         </div>
//       </div>

//       <div style={{
//         flex: 1,
//         height: '100%',
//         display: 'flex',
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//         fontStyle: 'italic',
//         fontSize: '1.25rem',
//         color: '#888',
//         padding: '1rem',
//         maxWidth: '300px',
//         textAlign: 'center',
//       }}>
//         <p></p>
//       </div>

//       <style>{`
//         #flipbook {
//           width: 700px;
//           height: 460px;
//         }

//         .page {
//           width: 340px;
//           height: 460px;
//           background-color: #fdf4e2;
//           font-family: Georgia, serif;
//           background-image: url("/book-texture.jpg");
//           background-size: cover;
//           padding: 2rem;
//           box-sizing: border-box;
//           overflow: hidden;
//           border-radius: 8px;
//           border: 2px solid #8b5c36;
//           box-shadow: none;
//         }

//         .page-inner {
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           height: 100%;
//           color: #3b2a23;
//         }

//         .category-badge {
//           background-color: #a0522d;
//           color: white;
//           padding: 4px 10px;
//           border-radius: 9999px;
//           font-size: 0.75rem;
//           font-weight: bold;
//           margin-bottom: 1rem;
//           display: inline-block;
//         }

//         .page-number {
//           text-align: center;
//           font-size: 0.8rem;
//           margin-top: auto;
//           color: #444;
//           font-style: italic;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BookPost;



import React, { useEffect, useRef } from 'react';
import { PageFlip } from 'page-flip';
import { Clock } from 'lucide-react';

const BookPost = ({ post }) => {
  const bookRef = useRef(null);
  const charsPerPage = 500;
  const pages = [];
  const content = post.content || '';

  for (let i = 0; i < content.length; i += charsPerPage) {
    let chunk = content.substring(i, i + charsPerPage);
    if (chunk.length > 100) {
      chunk = chunk.replace(/\b(\w+\b)/, (match) => match + ' ' + getRandomEmoji());
    }
    pages.push(chunk);
  }

  function getRandomEmoji() {
    const emojis = ['📖', '✨', '💡', '🌟', '🎯', '🚀', '💭', '🔥', '⭐', '🎨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  useEffect(() => {
    if (bookRef.current) {
      const flipBook = new PageFlip(bookRef.current, {
        width: 340,
        height: 460,
        size: 'fixed',
        maxShadowOpacity: 0,
        drawShadow: false,
        showCover: true,
        mobileScrollSupport: false,
        useMouseEvents: true,
        flippingTime: 800,
      });

      flipBook.loadFromHTML(document.querySelectorAll('.page'));
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      height: '100vh',
      width: '100%',
      paddingLeft: '8vw',
      paddingRight: '4vw',
      paddingTop: '5px',
      marginTop: '60px',
    }}>
      <div id="flipbook" ref={bookRef}>
        {/* Cover page with image and title overlay */}
        <div className="page cover-page">
          <div className="cover-image" style={{ backgroundImage: `url(${post.image})` }}>
            <div className="cover-overlay">
              <h1 className="cover-title">{post.title}</h1>
              <p className="cover-subtitle">Please turn to continue reading...</p>
            </div>
          </div>
        </div>

        {/* Author page */}
        <div className="page">
          <div className="page-inner">
            {post.author?.profilePicture && (
              <img
                src={post.author.profilePicture}
                alt={post.author.name || "Author"}
                style={{
                  width: '150px',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '50%', // <-- This makes it circular
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  alignSelf: 'center',
                }}
              />
            )}


            <div
              style={{
                maxWidth: '400px',
                padding: '1.2rem',
                borderRadius: '12px',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: '#333',
                margin: '1rem auto',
                marginLeft: '1rem',

              }}
            >
              <h3
                style={{
                  marginBottom: '0.3rem',
                  fontWeight: '600',
                  fontSize: '1.4rem',
                  color: '#222',
                }}
              >
                {post.author?.name || 'Anonymous'}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1rem',
                }}
              >
                <Clock size={16} />
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p
                style={{
                  marginTop: '0',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  color: '#444',
                }}
              >
                Discover wisdom, inspiration, and creativity hidden in every page. 📖
              </p>
              <p
                className="page-number"
                style={{
                  marginTop: '1.5rem',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: '#888',
                  textAlign: 'right',
                  userSelect: 'none',
                }}
              >
                Page 1
              </p>
            </div>
          </div>
        </div>

        {/* Title + first content chunk */}
        <div className="page">
          <div className="page-inner">
            {post.category && (
              <span className="category-badge">{post.category}</span>
            )}
            <h2>{post.title}</h2>
            <p>{pages[0]}</p>
            <p className="page-number">Page 2</p>
          </div>
        </div>

        {/* Remaining pages */}
        {pages.slice(1).map((text, i) => (
          <div className="page" key={i}>
            <div className="page-inner">
              <p>{text}</p>
              <p className="page-number">Page {i + 3}</p>
            </div>
          </div>
        ))}

        {/* End page */}
        <div className="page">
          <div className="page-inner" style={{ textAlign: 'center' }}>
            <h3>📚 The End</h3>
            <p>Thank you for reading. Keep turning pages in life. 🌟</p>
          </div>
        </div>
      </div>

      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontStyle: 'italic',
        fontSize: '1.25rem',
        color: '#888',
        padding: '1rem',
        maxWidth: '300px',
        textAlign: 'center',
      }}>
        <p></p>
      </div>

      <style>{`
        #flipbook {
          width: 700px;
          height: 460px;
        }

        .page {
          width: 340px;
          height: 460px;
          background-color: #fdf4e2;
          font-family: Georgia, serif;
          background-image: url("/book-texture.jpg");
          background-size: cover;
          padding: 2rem;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 8px;
          border: 2px solid #8b5c36;
          box-shadow: none;
        }

        .page-inner {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          color: #3b2a23;
        }

        .category-badge {
          background-color: #a0522d;
          color: white;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .page-number {
          text-align: center;
          font-size: 0.8rem;
          margin-top: auto;
          color: #444;
          font-style: italic;
        }

        .cover-page {
          padding: 0;
          border: none;
          box-shadow: none;
          overflow: hidden;
        }

        .cover-image {
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 8px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 2rem;
        }

        .cover-overlay {
          text-align: center;
          color: white;
          background: rgba(0, 0, 0, 0.4);
          padding: 1rem 1.5rem;
          border-radius: 12px;
        }

        .cover-title {
          font-size: 2rem;
          font-weight: bold;
          text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
          margin-bottom: 0.5rem;
        }

        .cover-subtitle {
          font-size: 1rem;
          font-style: italic;
          color: #f8f8f8;
        }
      `}</style>
    </div>
  );
};

export default BookPost;
