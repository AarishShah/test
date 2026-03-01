const fs = require('fs');
const path = require('path');

// The AI agent should edit `newFolder` to contain the generated endpoints.
const newFolder = {
    name: "Example New Resource API",
    description: "Endpoints for managing the example resource. This description was generated from the codebase.",
    item: [
        // AI AGENT: Replace this empty array with your fully generated GET/POST/PATCH/DELETE endpoints.
        // AFTER SUCCESSFUL EXECUTION: You MUST revert this file back to its original state (an empty [] array) so it is clean for the next run.
    ]
};

// Do not alter the logic below unless necessary
const targetFilePath = path.join(__dirname, '../../postman/collections/AI Generated.json');

try {
    const data = fs.readFileSync(targetFilePath, 'utf8');
    const collection = JSON.parse(data);

    // Prevent duplicates
    if (!collection.item.some(folder => folder.name === newFolder.name)) {
        collection.item.push(newFolder);
        fs.writeFileSync(targetFilePath, JSON.stringify(collection, null, "\t"));
        console.log(`Successfully added '${newFolder.name}' folder to AI Generated.json`);
    } else {
        console.log(`Folder '${newFolder.name}' already exists. Doing nothing.`);
    }
} catch (error) {
    console.error(`Failed to update collection: ${error.message}`);
}