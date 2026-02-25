import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

function Home({ posts }) {
  return (
    <>
      <Navbar />

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>
          No opinions yet. Be the first to speak 🔥
        </p>
      ) : (
        posts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            description={post.description}
          />
        ))
      )}
    </>
  );
}

export default Home;