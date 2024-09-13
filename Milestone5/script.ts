
// Save content to localStorage
function saveContent() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => {
      localStorage.setItem(el.id, el.innerHTML);
    });
  }
  
  // Restore content from localStorage
  function restoreContent() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => {
      const savedContent = localStorage.getItem(el.id);
      if (savedContent) {
        el.innerHTML = savedContent;
      }
    });
  }
  
  // Function to validate form fields
  function validateFormFields(): boolean {
    let isValid = true;
    let errorMessage = "";
  
    // Capture input fields
    const fields = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      degree: (document.getElementById("degree") as HTMLInputElement).value,
      institution: (document.getElementById("institution") as HTMLInputElement).value,
      graduationDate: (document.getElementById("graduation-date") as HTMLInputElement).value,
      jobTitle: (document.getElementById("job-title") as HTMLInputElement).value,
      company: (document.getElementById("company") as HTMLInputElement).value,
      startDate: (document.getElementById("start-date") as HTMLInputElement).value,
      endDate: (document.getElementById("end-date") as HTMLInputElement).value,
    };
  
    // Validate each field
    if (!fields.name) {
      isValid = false;
      errorMessage += "Name is required.\n";
    }
    if (!fields.email || !/\S+@\S+\.\S+/.test(fields.email)) {
      isValid = false;
      errorMessage += "Valid email is required.\n";
    }
    if (!fields.degree) {
      isValid = false;
      errorMessage += "Degree is required.\n";
    }
    if (!fields.institution) {
      isValid = false;
      errorMessage += "Institution is required.\n";
    }
    if (!fields.graduationDate) {
      isValid = false;
      errorMessage += "Graduation year is required.\n";
    }
    if (!fields.jobTitle) {
      isValid = false;
      errorMessage += "Job Title is required.\n";
    }
    if (!fields.company) {
      isValid = false;
      errorMessage += "Company is required.\n";
    }
    if (!fields.startDate) {
      isValid = false;
      errorMessage += "Start date is required.\n";
    }
    if (!fields.endDate) {
      isValid = false;
      errorMessage += "End date is required.\n";
    }
  
    // Validate skills
    const skillInputs = document.querySelectorAll("#skills-container input") as NodeListOf<HTMLInputElement>;
    if (skillInputs.length === 0 || !skillInputs[0].value.trim()) {
      isValid = false;
      errorMessage += "At least one skill is required.\n";
    }
  
    if (errorMessage) {
      alert(errorMessage);
    }
  
    return isValid;
  }
  
  // Function to save changes to resume data
  interface ResumeData {
    name: string;
    email: string;
    degree: string;
    institution: string;
    graduationYear: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    skills: string[];
  }
  
  let resumeData: ResumeData = {
    name: "",
    email: "",
    degree: "",
    institution: "",
    graduationYear: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    skills: [],
  };
  
  function saveChanges(fieldId: keyof ResumeData, value: string) {
    console.log(`Field edited: ${fieldId}, New Value: ${value}`);
    if (Array.isArray(resumeData[fieldId])) {
      resumeData[fieldId].push(value); // Add new skill to the array
    } else {
      resumeData[fieldId] = value as any; // Update other fields with the new value
    }
    console.log("Updated resume data:", resumeData);
  }
  
  // Print resume
  function printResume() {
    window.print();
  }
  
  // Event listener for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Restore content from localStorage
    restoreContent();
  
  
    // Editable elements
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
      element.addEventListener('focusout', () => {
        const links = element.querySelectorAll('a');
        links.forEach(link => {
          link.setAttribute('href', link.textContent?.trim() || '');
        });
      });
  
      element.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'A') {
          event.preventDefault();
          const url = target.getAttribute('href');
          if (url) {
            window.open(url, '_blank');
          }
        }
      });
  
      // Save content on input
      element.addEventListener('input', (event) => {
        const target = event.target as HTMLElement;
        saveChanges(target.id as keyof ResumeData, target.innerText);
      });
    });
  
    // Download Resume button
    document.getElementById('downloadResume')?.addEventListener('click', () => {
      printResume(); // Open the print dialog
    });
  
    // Generate unique URL based on the name
    document.getElementById('generateLink')?.addEventListener('click', () => {
      let userName = (document.getElementById('userName') as HTMLElement).textContent?.trim();
      if (userName) {
        const resumeUrl = `${window.location.origin}/resume/${encodeURIComponent(userName)}`;
        (document.getElementById('resumeLink') as HTMLInputElement).value = resumeUrl;
      } else {
        alert('Please enter your name');
      }
    });
  
    // Share Resume button to copy the unique link
    document.getElementById('shareResume')?.addEventListener('click', () => {
      const resumeLink = (document.getElementById('resumeLink') as HTMLInputElement).value;
      if (resumeLink) {
        navigator.clipboard.writeText(resumeLink).then(() => {
          alert('Resume link copied to clipboard');
        }, () => {
          alert('Failed to copy the link');
        });
      } else {
        alert('Generate the link first');
      }
    });
  
    // Add More Skills Logic
    document.getElementById('add-skill')?.addEventListener('click', () => {
      const firstSkillInput = document.querySelector('#skills-container input') as HTMLInputElement;
  
      if (!firstSkillInput || !firstSkillInput.value.trim()) {
        alert('Please fill in the first skill before adding more.');
        return;
      }
  
      const skillInput = document.createElement('input');
      skillInput.type = 'text';
      skillInput.placeholder = 'Skill';
      skillInput.required = true;
  
      document.getElementById('skills-container')?.appendChild(skillInput);
    });
  
    // Event Listener for Resume Form Submission
    document.getElementById('resume-form')?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
  
      if (!validateFormFields()) {
        return;
      }
  
      // Capture and display form data
      const fields = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        degree: (document.getElementById('degree') as HTMLInputElement).value,
        institution: (document.getElementById('institution') as HTMLInputElement).value,
        graduationDate: (document.getElementById('graduation-date') as HTMLInputElement).value,
        jobTitle: (document.getElementById('job-title') as HTMLInputElement).value,
        company: (document.getElementById('company') as HTMLInputElement).value,
        startDate: (document.getElementById('start-date') as HTMLInputElement).value,
        endDate: (document.getElementById('end-date') as HTMLInputElement).value,
      };
  
      (document.getElementById('display-name') as HTMLElement).textContent = fields.name; 
      (document.getElementById('display-email') as HTMLElement).textContent = fields.email;
      (document.getElementById('display-degree') as HTMLElement).textContent = fields.degree;
      (document.getElementById('display-institution') as HTMLElement).textContent = fields.institution;
      (document.getElementById('display-graduation-date') as HTMLElement).textContent = fields.graduationDate;
      (document.getElementById('display-job-title') as HTMLElement).textContent = fields.jobTitle;
      (document.getElementById('display-company') as HTMLElement).textContent = fields.company;
      (document.getElementById('display-start-date') as HTMLElement).textContent = fields.startDate;
      (document.getElementById('display-end-date') as HTMLElement).textContent = fields.endDate;
  
      const profilePic = (document.getElementById('profile-pic') as HTMLInputElement).files?.[0];
      if (profilePic) {
        const reader = new FileReader();
        reader.onload = function (e) {
          (document.getElementById('display-profile-pic') as HTMLImageElement).src = e.target?.result as string;
        };
        reader.readAsDataURL(profilePic);
      }
  
      const skillInputs = document.querySelectorAll('#skills-container input') as NodeListOf<HTMLInputElement>;
      const skills: string[] = [];
      skillInputs.forEach(input => {
        if (input.value.trim()) {
          skills.push(input.value);
        }
      });
  
      const displaySkills = document.getElementById('display-skill-list');
      if (displaySkills) {
        displaySkills.innerHTML = '';
        skills.forEach(skill => {
          const skillItem = document.createElement('li');
          skillItem.textContent = skill;
          displaySkills.appendChild(skillItem);
        });
      }
    });
  });