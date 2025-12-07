import React from "react";

const ExtraSection = () => {
  return (
    <div className="space-y-16 px-4 md:px-16 py-12 bg-gray-50">
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Why Adopt from PawMart?</h2>
        <p className="text-gray-700 text-lg">
          Every pet deserves a loving home. By adopting from PawMart, you’re not only giving a second chance to a rescued animal, but also helping reduce the number of pets in shelters. Adopt, don’t shop!
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8 underline">Meet Our Pet Heroes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3RFGtqiVKLFy7fEpGyvzBcu-ircv6UQzLyw&s"
              alt="Pet Hero 1"
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <h3 className="font-bold">Sarah Johnson</h3>
            <p className="text-gray-600 text-sm">Rescued 2 dogs and volunteers at local shelter.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src="https://media.istockphoto.com/id/628330740/photo/portrait-of-a-beautifull-smiling-man.jpg?s=612x612&w=0&k=20&c=t10Nhvv-kzaSEdYpL0-dUvN5_Z9YV58vvDGmwcjZrIk="
              alt="Pet Hero 2"
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <h3 className="font-bold">Ahmed Rahman</h3>
            <p className="text-gray-600 text-sm">Fosters kittens until they find loving families.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src="https://i.pinimg.com/736x/94/06/00/94060008c7f477fcb8345b64777d7fbf.jpg"
              alt="Pet Hero 3"
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <h3 className="font-bold">Priya Das</h3>
            <p className="text-gray-600 text-sm">Adopted 3 pets and promotes adoption awareness online.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img
              src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Pet Hero 4"
              className="w-24 h-24 mx-auto rounded-full mb-3"
            />
            <h3 className="font-bold">Riyad Karim</h3>
            <p className="text-gray-600 text-sm">Supports rescue centers and educates communities about adoption.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ExtraSection;
