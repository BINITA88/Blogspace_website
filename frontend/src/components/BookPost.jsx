import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import {
  Clock, Eye, Heart, MessageCircle, Share2,
} from 'lucide-react';

const BookPage = React.forwardRef(({ children }, ref) => (
  <div ref={ref} style={{
    backgroundColor: '#fdf4e2',
    fontFamily: 'Georgia, serif',
    padding: '1.5rem 1rem',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1.5px solid #8b5c36',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url("/book-texture.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    marginRight: '0.4rem',
    marginLeft: '0.4rem'
  }}>
    <div style={{ zIndex: 1 }}>
      {children}
    </div>
  </div>
));

const BookPost = ({ post, onLike, onComment, onShare }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments || []);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        user: 'You',
        text: commentText.trim(),
        date: new Date().toLocaleDateString(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
      onComment(post._id, newComment);
    }
  };

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
    const emojis = ['📖','✨','💡','🌟','🎯','🚀','💭','🔥','⭐','🎨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem',
      padding: '1rem',
      border: '3px solid #5d341a',
      borderRadius: '10px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      background: 'radial-gradient(circle, #f6ede1 0%, #f3dcc0 100%)',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative'
    }}>
      <HTMLFlipBook
        width={320}
        height={450}
        size="stretch"
        minWidth={280}
        maxWidth={360}
        minHeight={360}
        maxHeight={600}
        drawShadow={true}
        flippingTime={900}
        useMouseEvents={true}
        showCover={true}
        mobileScrollSupport={true}
        style={{ border: 'none' }}
      >
        {/* Page 1 - Book Cover */}
        <BookPage>
          <div style={{ textAlign: 'center', color: '#3b2a23', marginTop: '4rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>📘 Book of Thoughts</h1>
            <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>Turn the page to explore wisdom and wonder ✨</p>
          </div>
        </BookPage>

        {/* Page 2 - Left: Author Info & Intro */}
        <BookPage>
<div style={{ color: '#3b2a23', display: 'flex', marginRight: '12px', flexDirection: 'column', alignItems: 'center' }}>
            {post.image && (
              <img
                src={post.image}
                alt="Author"
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }}
              />
            )}
            <h3>{post.author?.name || 'Anonymous'}</h3>
            <p style={{ fontSize: '0.85rem', fontStyle: 'italic', marginTop: '0.3rem' }}>
              <Clock size={14} style={{ verticalAlign: 'middle' }} /> {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <hr style={{ width: '75%', margin: '1rem 0', borderTop: '1px solid #c9a074' }} />
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center', maxWidth: '90%' }}>
              Discover wisdom, inspiration, and creativity ✨ hidden in every page. Flip forward to start the journey! 📘
            </p>
          </div>
        </BookPage>

        {/* Page 3 - Right: Title & Intro */}
        <BookPage>
          <div style={{ color: '#3b2a23' }}>
            {post.category && (
              <span style={{
                backgroundColor: '#a0522d',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '1rem'
              }}>{post.category}</span>
            )}
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.4rem' }}>{post.title}</h1>
            <hr style={{ width: '60%', borderTop: '2px solid #a0522d', margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', textAlign: 'justify' }}>{pages[0]}</p>
          </div>
        </BookPage>

        {/* Remaining Pages */}
        {pages.slice(1).map((text, index) => (
          <BookPage key={index + 3}>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', textAlign: 'justify', color: '#3b2a23' }}>{text}</p>
          </BookPage>
        ))}

        {/* Back Page with Stats and Comment */}
        <BookPage>
          <div style={{ textAlign: 'center', color: '#3c2f2f', marginLeft: '23px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Post Stats</h3>
            <p><Eye size={14} /> {post.views}</p>
            <p><Heart size={14} /> {post.likes?.length || 0}</p>
            <p><MessageCircle size={14} /> {comments.length}</p>
            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => onLike(post._id)} style={{ margin: '0.4rem', padding: '5px 10px', borderRadius: '6px', backgroundColor: '#fae5d3', border: 'none', fontSize: '0.85rem' }}>❤️ Like</button>
              <button onClick={handleAddComment} style={{ margin: '0.4rem', padding: '5px 10px', borderRadius: '6px', backgroundColor: '#e0ecf9', border: 'none', fontSize: '0.85rem' }}>💬 Comment</button>
              <button onClick={() => onShare(post._id)} style={{ margin: '0.4rem', padding: '5px 10px', borderRadius: '6px', backgroundColor: '#e9f6e9', border: 'none', fontSize: '0.85rem' }}>🔗 Share</button>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                style={{ width: '90%', padding: '6px', fontSize: '0.85rem', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <div style={{ textAlign: 'left', marginTop: '1rem', maxHeight: '100px', overflowY: 'auto', padding: '0 1rem' }}>
                {comments.map((c, i) => (
                  <p key={i} style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong>{c.user}:</strong> {c.text}</p>
                ))}
              </div>
            </div>
          </div>
        </BookPage>
      </HTMLFlipBook>
      <div style={{
        position: 'absolute',
        top: '0.5rem',
        bottom: '0.5rem',
        left: '50%',
        transform: 'translateX(-1.5px)',
        width: '3px',
        backgroundColor: '#8b5c36',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
    </div>
  );
};

export default BookPost;