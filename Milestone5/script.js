// Save content to localStorage
function saveContent() {
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(function (el) {
        localStorage.setItem(el.id, el.innerHTML);
    });
}
// Restore content from localStorage
function restoreContent() {
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(function (el) {
        var savedContent = localStorage.getItem(el.id);
        if (savedContent) {
            el.innerHTML = savedContent;
        }
    });
}
// Function to validate form fields
function validateFormFields() {
    var isValid = true;
    var errorMessage = "";
    // Capture input fields
    var fields = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        degree: document.getElementById("degree").value,
        institution: document.getElementById("institution").value,
        graduationDate: document.getElementById("graduation-date").value,
        jobTitle: document.getElementById("job-title").value,
        company: document.getElementById("company").value,
        startDate: document.getElementById("start-date").value,
        endDate: document.getElementById("end-date").value,
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
    var skillInputs = document.querySelectorAll("#skills-container input");
    if (skillInputs.length === 0 || !skillInputs[0].value.trim()) {
        isValid = false;
        errorMessage += "At least one skill is required.\n";
    }
    if (errorMessage) {
        alert(errorMessage);
    }
    return isValid;
}
var resumeData = {
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
function saveChanges(fieldId, value) {
    console.log("Field edited: ".concat(fieldId, ", New Value: ").concat(value));
    if (Array.isArray(resumeData[fieldId])) {
        resumeData[fieldId].push(value); // Add new skill to the array
    }
    else {
        resumeData[fieldId] = value; // Update other fields with the new value
    }
    console.log("Updated resume data:", resumeData);
}
// Print resume
function printResume() {
    window.print();
}
// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e;
    // Restore content from localStorage
    restoreContent();
    // Editable elements
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(function (element) {
        element.addEventListener('focusout', function () {
            var links = element.querySelectorAll('a');
            links.forEach(function (link) {
                var _a;
                link.setAttribute('href', ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '');
            });
        });
        element.addEventListener('click', function (event) {
            var target = event.target;
            if (target.tagName === 'A') {
                event.preventDefault();
                var url = target.getAttribute('href');
                if (url) {
                    window.open(url, '_blank');
                }
            }
        });
        // Save content on input
        element.addEventListener('input', function (event) {
            var target = event.target;
            saveChanges(target.id, target.innerText);
        });
    });
    // Download Resume button
    (_a = document.getElementById('downloadResume')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        printResume(); // Open the print dialog
    });
    // Generate unique URL based on the name
    (_b = document.getElementById('generateLink')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
        var _a;
        var userName = (_a = document.getElementById('userName').textContent) === null || _a === void 0 ? void 0 : _a.trim();
        if (userName) {
            var resumeUrl = "".concat(window.location.origin, "/resume/").concat(encodeURIComponent(userName));
            document.getElementById('resumeLink').value = resumeUrl;
        }
        else {
            alert('Please enter your name');
        }
    });
    // Share Resume button to copy the unique link
    (_c = document.getElementById('shareResume')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
        var resumeLink = document.getElementById('resumeLink').value;
        if (resumeLink) {
            navigator.clipboard.writeText(resumeLink).then(function () {
                alert('Resume link copied to clipboard');
            }, function () {
                alert('Failed to copy the link');
            });
        }
        else {
            alert('Generate the link first');
        }
    });
    // Add More Skills Logic
    (_d = document.getElementById('add-skill')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        var _a;
        var firstSkillInput = document.querySelector('#skills-container input');
        if (!firstSkillInput || !firstSkillInput.value.trim()) {
            alert('Please fill in the first skill before adding more.');
            return;
        }
        var skillInput = document.createElement('input');
        skillInput.type = 'text';
        skillInput.placeholder = 'Skill';
        skillInput.required = true;
        (_a = document.getElementById('skills-container')) === null || _a === void 0 ? void 0 : _a.appendChild(skillInput);
    });
    // Event Listener for Resume Form Submission
    (_e = document.getElementById('resume-form')) === null || _e === void 0 ? void 0 : _e.addEventListener('submit', function (e) {
        var _a;
        e.preventDefault();
        if (!validateFormFields()) {
            return;
        }
        // Capture and display form data
        var fields = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            degree: document.getElementById('degree').value,
            institution: document.getElementById('institution').value,
            graduationDate: document.getElementById('graduation-date').value,
            jobTitle: document.getElementById('job-title').value,
            company: document.getElementById('company').value,
            startDate: document.getElementById('start-date').value,
            endDate: document.getElementById('end-date').value,
        };
        document.getElementById('display-name').textContent = fields.name;
        document.getElementById('display-email').textContent = fields.email;
        document.getElementById('display-degree').textContent = fields.degree;
        document.getElementById('display-institution').textContent = fields.institution;
        document.getElementById('display-graduation-date').textContent = fields.graduationDate;
        document.getElementById('display-job-title').textContent = fields.jobTitle;
        document.getElementById('display-company').textContent = fields.company;
        document.getElementById('display-start-date').textContent = fields.startDate;
        document.getElementById('display-end-date').textContent = fields.endDate;
        var profilePic = (_a = document.getElementById('profile-pic').files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePic) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                document.getElementById('display-profile-pic').src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePic);
        }
        var skillInputs = document.querySelectorAll('#skills-container input');
        var skills = [];
        skillInputs.forEach(function (input) {
            if (input.value.trim()) {
                skills.push(input.value);
            }
        });
        var displaySkills = document.getElementById('display-skill-list');
        if (displaySkills) {
            displaySkills.innerHTML = '';
            skills.forEach(function (skill) {
                var skillItem = document.createElement('li');
                skillItem.textContent = skill;
                displaySkills.appendChild(skillItem);
            });
        }
    });
});
