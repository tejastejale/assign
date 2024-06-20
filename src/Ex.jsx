import React, { useState, useEffect } from 'react';
import './App.css';  // Assuming the CSS is saved in App.css

// Custom hook for form validation
const useValidation = (values, setErrors) => {
  useEffect(() => {
    const errors = {};

    // Validation logic
    if (!values.fullName) errors.fullName = 'Full Name is required.';
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required.';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number.';
    }
    if (values.applyingFor === 'Developer' || values.applyingFor === 'Designer') {
      if (!values.relevantExperience || values.relevantExperience <= 0) {
        errors.relevantExperience = 'Relevant Experience is required and must be greater than 0.';
      }
    }
    if (values.applyingFor === 'Designer' && !values.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required.';
    } else if (values.portfolioUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(values.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL is invalid.';
    }
    if (values.applyingFor === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required.';
    }
    if (!values.additionalSkills || values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected.';
    }
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required.';
    } else if (isNaN(new Date(values.preferredInterviewTime).getTime())) {
      errors.preferredInterviewTime = 'Preferred Interview Time is invalid.';
    }

    setErrors(errors);
  }, [values, setErrors]);
};

const JobApplicationForm = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useValidation(values, setErrors);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues((prevValues) => ({
        ...prevValues,
        additionalSkills: checked
          ? [...prevValues.additionalSkills, value]
          : prevValues.additionalSkills.filter((skill) => skill !== value)
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && Object.keys(values).every(key => values[key] !== '' || key === 'portfolioUrl' && values.applyingFor !== 'Designer')) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>

        <div>
          <label>Applying for Position:</label>
          <select name="applyingFor" value={values.applyingFor} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {(values.applyingFor === 'Developer' || values.applyingFor === 'Designer') && (
          <div>
            <label>Relevant Experience (years):</label>
            <input type="number" name="relevantExperience" value={values.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
          </div>
        )}

        {values.applyingFor === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioUrl" value={values.portfolioUrl} onChange={handleChange} />
            {errors.portfolioUrl && <span>{errors.portfolioUrl}</span>}
          </div>
        )}

        {values.applyingFor === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={values.managementExperience} onChange={handleChange}></textarea>
            {errors.managementExperience && <span>{errors.managementExperience}</span>}
          </div>
        )}

        <div>
          <label>Additional Skills:</label>
          <label>
            <input type="checkbox" name="additionalSkills" value="JavaScript" onChange={handleChange} />
            JavaScript
          </label>
          <label>
            <input type="checkbox" name="additionalSkills" value="CSS" onChange={handleChange} />
            CSS
          </label>
          <label>
            <input type="checkbox" name="additionalSkills" value="Python" onChange={handleChange} />
            Python
          </label>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </div>

        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="preferredInterviewTime" value={values.preferredInterviewTime} onChange={handleChange} />
          {errors.preferredInterviewTime && <span>{errors.preferredInterviewTime}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="summary">
          <h2>Form Submitted</h2>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {values.applyingFor}</p>
          {(values.applyingFor === 'Developer' || values.applyingFor === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {values.relevantExperience} years</p>
          )}
          {values.applyingFor === 'Designer' && (
            <p><strong>Portfolio URL:</strong> <a href={values.portfolioUrl} target="_blank" rel="noopener noreferrer">{values.portfolioUrl}</a></p>
          )}
          {values.applyingFor === 'Manager' && (
            <p><strong>Management Experience:</strong> {values.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {values.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {new Date(values.preferredInterviewTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
