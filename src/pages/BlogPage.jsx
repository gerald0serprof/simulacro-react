import { useMemo, useState } from 'react';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { posts } from '../data/content';

export default function BlogPage() {
  const [category, setCategory] = useState('Todos');
  const categories = ['Todos', ...new Set(posts.map((post) => post.category))];

  const filteredPosts = useMemo(() => {
    if (category === 'Todos') return posts;
    return posts.filter((post) => post.category === category);
  }, [category]);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Blog</p>
        <h1>Consejos de salud para tu mascota</h1>
        <p className="section-intro">Contenido educativo con un diseño editorial más claro, profesional y cómodo de leer.</p>
        <div className="filter-row">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="blog-grid pro-blog-grid">
          {filteredPosts.map((post) => (
            <article className="blog-card-pro" key={post.title}>
              <div className="blog-card-top">
                <span className="tag">{post.category}</span>
                <span className="read-time"><FiClock /> {post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a className="blog-link" href="#leer">
                Leer artículo <FiArrowRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
