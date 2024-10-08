export default function AboutUs() {
  return (
    <>
      <div className="md:text-xl leading-10 ">
        <p className="md:m-6">
          Let Them Create is a company founded by a group of creatives and
          artists passionate about bringing new skills to our local community.
        </p>
        <p className="md:m-6">
          {" "}
          Our mission is to{" "}
          <span className="underline decoration-wavy text-orange-dark">
            inspire
          </span>{" "}
          you by hosting and helping you to find local arts and crafts events
          where you can{" "}
          <span className="underline decoration-wavy text-orange-dark">
            create
          </span>{" "}
          in new mediums and{" "}
          <span className="underline decoration-wavy text-orange-dark">
            connect
          </span>{" "}
          with others that share your interests.
        </p>
        <p className="md:m-6">
          Whether you are an established artist or have never dabbled in making
          before, we are confident you will find an event to pique your creative
          interests!
        </p>
      </div>
    </>
  );
}
