import React, { useState } from 'react';
import '../css/Blogs.css';
import FullPageWrapper from './publicQ&A/FullPagewrapper';

const Blogs = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: 'Understanding Legal Technology in 2025',
      excerpt: 'The role of legal technology is rapidly growing in 2025. Learn about its impact on legal firms and the legal industry as a whole.',
      image: '/images/blog1.jpeg',
      googleLink: 'https://www.google.com/search?q=legal+technology+2025',
    },
    {
      id: 2,
      title: 'How to Protect Your Intellectual Property Online',
      excerpt: 'In this blog, we explore effective strategies for protecting intellectual property in the digital world.',
      image: 'images/blog2.jpeg',
      googleLink: 'https://www.google.com/search?q=protect+intellectual+property+online',
    },
    {
      id: 3,
      title: 'Understanding Contract Law: A Beginner\'s Guide',
      excerpt: 'Contracts are a crucial part of business and personal dealings. Here\'s a beginner-friendly guide to understanding contract law.',
      image: 'images/blog3.jpeg',
      googleLink: 'https://www.google.com/search?q=understanding+contract+law+beginner',
    },
    {
      id: 4,
      title: 'The Future of Data Privacy Laws in 2025',
      excerpt: 'With the increasing importance of data security, privacy laws are evolving rapidly. Find out what the future holds for data privacy laws.',
      image: 'images/blog4.jpeg',
      googleLink: 'https://www.google.com/search?q=future+of+data+privacy+laws+2025',
    },
    {
      id: 5,
      title: 'What to Know About Family Law: Divorce and Custody',
      excerpt: 'Family law can be complex. Here\'s a comprehensive look at divorce and custody cases and what you should know before making decisions.',
      image: 'images/blog5.jpeg',
      googleLink: 'https://www.google.com/search?q=family+law+divorce+and+custody',
    },
    {
      id: 6,
      title: 'How to Start Your Own Legal Practice',
      excerpt: 'Starting your own law practice can be a rewarding career move. This blog explores the essential steps to starting your own firm.',
      image: 'images/blog6.jpeg',
      googleLink: 'https://www.google.com/search?q=start+your+own+legal+practice',
    },
    {
      id: 7,
      title: 'How Artificial Intelligence is Shaping Legal Services',
      excerpt: 'AI is changing the way legal services are delivered. In this blog, we explore the role of AI in law and its potential to revolutionize the industry.',
      image: 'images/blog7.jpeg',
      googleLink: 'https://www.google.com/search?q=artificial+intelligence+shaping+legal+services',
    },
    {
      id: 8,
      title: 'The Importance of Cybersecurity in Legal Firms',
      excerpt: 'With the rise of cyber threats, legal firms must prioritize cybersecurity. Here\'s why protecting client data is critical in today\'s digital age.',
      image: 'images/blog8.jpeg',
      googleLink: 'https://www.google.com/search?q=importance+of+cybersecurity+in+legal+firms',
    },
    {
      id: 9,
      title: 'Navigating Bankruptcy Law: What You Need to Know',
      excerpt: 'Bankruptcy can be a complicated process. Learn about the basics of bankruptcy law and how to navigate this challenging area.',
      image: 'images/blog9.jpeg',
      googleLink: 'https://www.google.com/search?q=navigating+bankruptcy+law+2025',
    },
    {
      id: 10,
      title: 'The Ethics of Legal Advertising',
      excerpt: 'Legal advertising is subject to strict ethical standards. This blog looks at the key ethical considerations law firms must keep in mind when advertising.',
      image: 'images/blog10.jpeg',
      googleLink: 'https://www.google.com/search?q=ethics+of+legal+advertising',
    }
  ]);

  return (
    <FullPageWrapper>
<div className="page-container">
    <div className="blogs-page">
      <h1 className="page-title">Latest Legal Blogs</h1>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img
                src={blog.image || 'https://via.placeholder.com/400x200'}
                alt={blog.title}
                className="blog-image"
              />
              <h2>{blog.title}</h2>
              <p>{blog.excerpt}</p>
              <a
                href={blog.googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
    </FullPageWrapper>
  );
};

export default Blogs;
