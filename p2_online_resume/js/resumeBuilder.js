/* ----- Biography Object ----- */
var bio = {
  "name": "Andreu Masferrer",
  "role": "Web developer",
  "contacts": {
    "mobile": "+34 666666666",
    "email": "andreumasferrer@gmail.com",
    "github": "andreumasferrer",
    "twitter": "@andreumasferrer",
    "location": "Barcelona",
  },
  "welcome-message": "I'm passionate about digital products design and web development.",
  "skills": ["HTML", "CSS", "JavaScript", "Ruby"],
  "biopic": "images/fry.jpg"
};

bio.display = function() {
  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
  $("#header").prepend(formattedRole);
  $("#header").prepend(formattedName);

  for (var contact in bio.contacts) {
    if (bio.contacts.hasOwnProperty(contact)) {
      var formattedContact = HTMLcontactGeneric.replace("%contact%", contact).replace("%data%", bio.contacts[contact]);
      $("#topContacts").append(formattedContact);
      $("#footerContacts").append(formattedContact);
    }
  }

  var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
  var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio["welcome-message"]);
  $("#header").append(formattedBioPic);
  $("#header").append(formattedMessage);

  if (bio.skills.length > 0) {
    $("#header").append(HTMLskillsStart);
    bio.skills.forEach(function(skill) {
      var formattedSkill = HTMLskills.replace("%data%", skill);
      $("#skills").append(formattedSkill);
    });
  }
};


/* ----- Work Object ----- */
var work = {
  "jobs": [{
    "employer": "Onebox TDS",
    "title": "Product Manager",
    "location": "Barcelona, Spain",
    "dates": "2011-2016",
    "description": "Product Manager administering lifecycle of products and coordinating teams towards the company’s vision. Identification of business and users needs, prioritization of requirements, definition of long and medium product roadmap and assessment of results."
  }, {
    "employer": "Atmira Espacio de Consultoría S.L.",
    "title": "Project Manager",
    "location": "Barcelona, Spain",
    "dates": "2006-2010",
    "description": "In charge of the team for corrective maintenance and extensions of \"Monitoring Risk\" and \"Debt Recovery\" solutions used in several financial institutions."
  }]
};

work.display = function() {
  work.jobs.forEach(function(job) {
    $("#workExperience").append(HTMLworkStart);
    var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
    $(".work-entry:last").append(formattedEmployer + formattedTitle);
    var formattedDates = HTMLworkDates.replace("%data%", job.dates);
    $(".work-entry:last").append(formattedDates);
    var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
    $(".work-entry:last").append(formattedLocation);
    var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
    $(".work-entry:last").append(formattedDescription);
  });
};


/* ----- Projects Object ----- */
var projects = {
  "projects": [{
    "title": "Project 1",
    "dates": "June 2016",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "images": ["images/197x148.gif", "images/197x148.gif"]
  }, {
    "title": "Project 2",
    "dates": "June 2016",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "images": ["images/197x148.gif", "images/197x148.gif"]
  }]
};

projects.display = function() {
  projects.projects.forEach(function(project) {
    $("#projects").append(HTMLprojectStart);
    var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
    $(".project-entry:last").append(formattedTitle);
    var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
    $(".project-entry:last").append(formattedDates);
    var formattedDescription = HTMLprojectDescription.replace("%data%", project.description);
    $(".project-entry:last").append(formattedDescription);
    if (project.images.length > 0) {
      project.images.forEach(function(image) {
        var formattedImage = HTMLprojectImage.replace("%data%", image);
        $(".project-entry:last").append(formattedImage);
      });
    }
  });
};

/* ----- Education Object ----- */
var education = {
  "schools": [{
    "name": "Universitat Politècnica de Catalunya",
    "location": "Barcelona, Spain",
    "degree": "Masters",
    "majors": ["CS"],
    "dates": "1996-2004",
    "url": "http://www.fib.upc.edu/"
  }, {
    "name": "Georgia Institute of Technology",
    "location": "Atlanta, GA",
    "degree": "Masters",
    "majors": ["CS"],
    "dates": "2004",
    "url": "http://www.gatech.edu/"
  }],
  "onlineCourses": [{
    "title": "Human Computer Interaction",
    "school": "Coursera",
    "dates": "2012",
    "url": "https://www.coursera.org/"
  }]
};

education.display = function() {
  education.schools.forEach(function(school) {
    $("#education").append(HTMLschoolStart);
    var formattedName = HTMLschoolName.replace("%data%", school.name).replace("#", school.url);
    var formatedDegree = HTMLschoolDegree.replace("%data%", school.degree);
    $(".education-entry:last").append(formattedName + formatedDegree);
    var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
    $(".education-entry:last").append(formattedDates);
    var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);
    $(".education-entry:last").append(formattedLocation);
    school.majors.forEach(function(major) {
      var formattedMajor = HTMLschoolMajor.replace("%data%", major);
      $(".education-entry:last").append(formattedMajor);
    });
  });
  if (education.onlineCourses.length > 0) {
    $("#education").append(HTMLonlineClasses);
    education.onlineCourses.forEach(function(course) {
      $("#education").append(HTMLschoolStart);
      var formattedTitle = HTMLonlineTitle.replace("%data%", course.title).replace("#", course.url);
      var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
      $(".education-entry:last").append(formattedTitle + formattedSchool);
      var formattedDates = HTMLonlineDates.replace("%data%", course.dates);
      $(".education-entry:last").append(formattedDates);
      var formattedURL = HTMLonlineURL.replace("%data%", course.url).replace("#", course.url);
      $(".education-entry:last").append(formattedURL);
    });
  }
};


/* ----- Display calls ----- */
work.display();
bio.display();
projects.display();
education.display();

/* ----- Show map----- */
$("#mapDiv").append(googleMap);
