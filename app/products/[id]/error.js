"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <h2>Something went wrong with this product!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
