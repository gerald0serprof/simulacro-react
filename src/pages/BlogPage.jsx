import { posts } from '../data/content';

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Blog</p>
        <h1>Consejos de salud para tu mascota</h1>
        <div className="cards-grid">
          {posts.map((post) => (
            <article className="info-card" key={post.title}>
              <span className="tag">{post.category}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
