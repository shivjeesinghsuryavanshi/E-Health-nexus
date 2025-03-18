import React from 'react'

const About = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <div className="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600&h=750" loading="lazy" alt="Photo by Martin Sanchez" class="h-full w-full object-cover object-center" />
            </div>
          </div>

          <div className="md:pt-8">
            <p className="text-center font-bold text-indigo-500 md:text-left">Who we are</p>

            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">Our competitive advantage</h1>

            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
            

              We, Shiv Jee Singh and Saniya Srivastava, are driven by a shared passion for technology and innovation. With expertise in full-stack development, Python, and cybersecurity, we thrive on solving complex problems and creating efficient solutions. Our collaborative approach, strong leadership, and commitment to continuous learning help us stay ahead in the ever-evolving tech landscape. Together, we aim to make a meaningful impact through our skills, dedication, and forward-thinking mindset.<br /><br />

              
            </p>

            <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">About us</h2>

            <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">

              We are Shiv Jee Singh and Saniya Srivastava, passionate tech enthusiasts dedicated to innovation and problem-solving. With a strong background in full-stack development, cybersecurity, and Python, we strive to build impactful solutions. Our teamwork, creativity, and technical expertise drive us to take on new challenges and deliver excellence. Together, we are committed to continuous learning and making a difference in the tech world..</p>
          </div>
        </div>
      </div>
    </div>



  );

}

export default About;