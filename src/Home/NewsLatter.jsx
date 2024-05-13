

const NewsLatter = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200 relative my-10" style={{backgroundImage: 'url(https://wallpaperswide.com/download/luxury_water_bungalows_maldives-wallpaper-1680x1050.jpg)'}}>
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  <div className="hero-content ">
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <h3 className="text_3xl font-semibold text-center mt-8">Subscribe to newsletter</h3>
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default NewsLatter;