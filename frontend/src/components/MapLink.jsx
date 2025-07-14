const MapLink = () => {
  return (
    <div className="contact  w-full">
      <div
        className="w-full"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div className="contact__map">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                id="gmap_canvas"
                className="w-full h-96 rounded-lg shadow-md"
                src="https://maps.google.com/maps?q=kathmandu&t=&z=10&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title="Nepal Map"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLink;
