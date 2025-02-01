import React from 'react';

function InfoSection() {
  const cards = [
    {
      image: 'https://softstandard.com/wp-content/uploads/2016/05/consulting.jpg',
      title: 'Consulting',
      description:
        'The e-World has created innumerable opportunities for organizations to exploit their core business competencies by...',
      link: '#',
    },
    {
      image: 'https://softstandard.com/wp-content/uploads/2016/05/case.jpg',
      title: 'Case Studies',
      description:
        'Delivering excellence, IT Staffing Solutions support restaurant chain’s tremendous growth and IT Staffing Solutions.',
      link: '#',
    },
    {
      image: 'https://softstandard.com/wp-content/uploads/2016/05/about_company.jpg',
      title: 'About Company',
      description:
        'Theplacify offers a broad range of professional consulting, systems analysis & development, systems integration and support services...',
      link: '#',
    },
  ];

  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://softstandard.com/wp-content/uploads/2016/05/ipad.jpg')`, // Replace with your background image URL
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <a
                  href={card.link}
                  className="text-[#00BFB3] hover:text-[#008F86] font-medium"
                >
                  READ MORE →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Optional Overlay for Darkening Background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </section>
  );
}

export default InfoSection;
