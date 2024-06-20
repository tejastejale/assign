import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SurveyForm = () => {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  // Custom hook for form validation
  const useValidation = (values, setErrors) => {
    useEffect(() => {
      const errors = {};

      if (!values.fullName) errors.fullName = 'Full Name is required.';
      if (!values.email) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid.';
      }
      if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required.';

      if (values.surveyTopic === 'Technology') {
        if (!values.favoriteProgrammingLanguage) {
          errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required.';
        }
        if (!values.yearsOfExperience) {
          errors.yearsOfExperience = 'Years of Experience is required.';
        } else if (isNaN(values.yearsOfExperience) || values.yearsOfExperience <= 0) {
          errors.yearsOfExperience = 'Years of Experience must be a number greater than 0.';
        }
      }

      if (values.surveyTopic === 'Health') {
        if (!values.exerciseFrequency) {
          errors.exerciseFrequency = 'Exercise Frequency is required.';
        }
        if (!values.dietPreference) {
          errors.dietPreference = 'Diet Preference is required.';
        }
      }

      if (values.surveyTopic === 'Education') {
        if (!values.highestQualification) {
          errors.highestQualification = 'Highest Qualification is required.';
        }
        if (!values.fieldOfStudy) {
          errors.fieldOfStudy = 'Field of Study is required.';
        }
      }

      if (!values.feedback) {
        errors.feedback = 'Feedback is required.';
      } else if (values.feedback.length < 50) {
        errors.feedback = 'Feedback must be at least 50 characters.';
      }

      setErrors(errors);
    }, [values, setErrors]);
  };

  useValidation(values, setErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && Object.keys(values).every(key => values[key] !== '')) {
      setSubmitted(true);
      // Fetch additional questions from the API based on the selected survey topic
      try {
        const response = await axios.get(`https://api.example.com/survey/${values.surveyTopic}`);
        setAdditionalQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching additional questions:', error);
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="container">
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={values.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={values.surveyTopic} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <div className="form-group">
            <label>Favorite Programming Language:</label>
            <select name="favoriteProgrammingLanguage" value={values.favoriteProgrammingLanguage} onChange={handleChange}>
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <span>{errors.favoriteProgrammingLanguage}</span>}

            <label>Years of Experience:</label>
            <input type="number" name="yearsOfExperience" value={values.yearsOfExperience} onChange={handleChange} />
            {errors.yearsOfExperience && <span>{errors.yearsOfExperience}</span>}
          </div>
        )}

        {values.surveyTopic === 'Health' && (
          <div className="form-group">
            <label>Exercise Frequency:</label>
            <select name="exerciseFrequency" value={values.exerciseFrequency} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}

            <label>Diet Preference:</label>
            <select name="dietPreference" value={values.dietPreference} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <span>{errors.dietPreference}</span>}
          </div>
        )}

        {values.surveyTopic === 'Education' && (
          <div className="form-group">
            <label>Highest Qualification:</label>
            <select name="highestQualification" value={values.highestQualification} onChange={handleChange}>
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <span>{errors.highestQualification}</span>}

            <label>Field of Study:</label>
            <input type="text" name="fieldOfStudy" value={values.fieldOfStudy} onChange={handleChange} />
            {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Feedback:</label>
          <textarea name="feedback" value={values.feedback} onChange={handleChange}></textarea>
          {errors.feedback && <span>{errors.feedback}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="summary">
          <h2>Form Submitted</h2>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Survey Topic:</strong> {values.surveyTopic}</p>
          {values.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {values.favoriteProgrammingLanguage}</p>
              <p><strong>Years of Experience:</strong> {values.yearsOfExperience}</p>
            </>
          )}
          {values.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {values.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {values.dietPreference}</p>
            </>
          )}
          {values.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {values.highestQualification}</p>
              <p><strong>Field of Study:</strong> {values.fieldOfStudy}</p>
            </>
          )}
          <p><strong>Feedback:</strong> {values.feedback}</p>

          {additionalQuestions.length > 0 && (
            <div>
              <h3>Additional Questions</h3>
              {additionalQuestions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
