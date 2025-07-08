import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State to hold the list of directory items
  const [directoryItems, setDirectoryItems] = useState([]);
  // State to hold the currently selected item
  const [selectedItem, setSelectedItem] = useState(null);
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the directory and how-to guides.
  // In a real application, this data would likely come from an API or database.
  const mockData = [
    {
      id: 'getting-started-with-a-new-mentee',
      title: 'Getting Started with a New Mentee',
      description: 'Steps to successfully onboard a new mentee into the program.',
      howTo: [
        'Initial Welcome Email: Send a personalized welcome email within 24 hours of the connection email MCP sends.',
        'Schedule First Call: Set up a 30-minute introductory call via Zoom, Google Meets, or telephone.',
        'Share Program Resources: Provide links to the Course Companion and relevant platform guides.',
        'Set Expectations: Discuss communication frequency and initial goals during the first call.',
        'Assign First Task: Give a simple, clear task to get them started.',
      ],
      actionItems: [
        'ACTION: Send Welcome Email (Template available in Shared Drive).',
        'ACTION: Schedule Intro Call (Use Acuity link that includes your first-last name).',
        'ACTION: Verify Mentee has access to Moodle and Course Companion.',
      ],
    },
    {
      id: 'submitting-feedback',
      title: 'Submitting Feedback in Course Companion',
      description: 'Guide on how to provide constructive feedback effectively.',
      howTo: [
        'Confirm Moodle submission has been made: Did you receive a notification? If so, proceed. If not, wait until you receive a Moodle scoring notification',
	'Access Submission: Navigate to the mentee\'s submission in Course Companion.',
        'Review Content: Carefully read through the mentee\'s work.',
        'Identify Strengths: Note areas where the mentee performed well.',
        'Identify Areas for Improvement: Pinpoint specific sections that need revision.',
        'Provide Specific, Actionable Comments: Instead of "good job," say "Your introduction clearly outlines the problem."',
        'Use Rubric: Ensure feedback aligns with the scoring rubric.',
        'Submit Feedback: Click the "Submit Feedback" button.',
      ],
      actionItems: [
        'ACTION: Open Course Companion and locate mentee\'s submission.',
        'ACTION: Draft feedback focusing on 1-2 key areas for improvement.',
        'ACTION: Ensure feedback is constructive and encouraging.',
      ],
    },
    {
      id: 'moodle-submission-issues',
      title: 'Troubleshooting Moodle Submission Issues',
      description: 'Common problems and solutions for mentee Moodle submissions.',
      howTo: [
        'Check Internet Connection: Ensure the mentee has a stable internet connection.',
        'Clear Browser Cache: Advise mentee to clear browser cache and cookies.',
        'Try Different Browser: Suggest using an alternative browser (Chrome, Firefox, Edge).',
        'Verify File Format: Confirm the submitted file is in an accepted format (e.g., PDF, DOCX).',
        'Screenshot Error: Ask mentee to provide a screenshot of any error messages.',
        'Contact Support: If issues persist, escalate to technical support with details.',
      ],
      actionItems: [
        'ACTION: Ask mentee to describe the exact error message or behavior.',
        'ACTION: Guide mentee through clearing cache or trying another browser.',
        'ACTION: If unresolved, gather details and escalate to IT support.',
      ],
    },
    {
      id: 'scoring-workflow-revisions',
      title: 'Scoring Workflow: Handling Revisions',
      description: 'How to manage submissions that require revisions.',
      howTo: [
        'Do NOT leave submission open: If a submission requires revisions, do not leave it in an "open" or "pending" state.',
        'Score as 0: Assign a score of 0 to the submission in Moodle/Course Companion.',
        'Log Time Entry: Immediately submit a time entry (e.g., in your time tracking system) indicating "Submission requires revisions" or similar.',
        'Provide Feedback: In the Course Companion, provide clear, constructive feedback detailing what needs to be revised.',
        'Communicate with Mentee: Inform the mentee directly about the required revisions and the process for resubmission.',
      ],
      actionItems: [
        'ACTION: For a submission needing revision, score it as 0.',
        'ACTION: Log a "Requires Revision" time entry.',
        'ACTION: Provide detailed feedback in Course Companion.',
      ],
    },
  ];

  // Effect to load initial data
  useEffect(() => {
    setDirectoryItems(mockData);
  }, []);

  // Filtered items based on search query
  const filteredItems = directoryItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Mentoring Program Guide
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search topics..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Directory Column */}
          <div className="lg:w-1/3 bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200 overflow-y-auto max-h-[60vh]">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Directory Topics</h2>
            {filteredItems.length === 0 ? (
              <p className="text-gray-500 italic">No topics found for your search.</p>
            ) : (
              <ul className="space-y-3">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left p-3 rounded-lg transition duration-200 ease-in-out
                        ${selectedItem && selectedItem.id === item.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <p className={`text-sm ${selectedItem && selectedItem.id === item.id ? 'text-blue-100' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* How-To Guide & Action Items Column */}
          <div className="lg:w-2/3 bg-gray-50 p-4 rounded-xl shadow-inner border border-gray-200">
            {selectedItem ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedItem.title}</h2>

                {/* How-To Guide */}
                <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path></svg>
                    How-To Guide
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {selectedItem.howTo.map((step, index) => (
                      <li key={index} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Action Item Output */}
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Your Action Items
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {selectedItem.actionItems.map((action, index) => (
                      <li key={index} className="font-medium text-green-700 leading-relaxed">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-lg italic p-4">
                Select a topic from the directory to view its guide and action items.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
