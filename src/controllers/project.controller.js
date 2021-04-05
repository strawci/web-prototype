import Project from "../models/project.model";
import { fetchByID } from "./organization.controller";
import { generateKey } from "../utils/random";

export async function deleteAllProjectsByOrg(orgID) {
    const projects = await Project.find({ organization: orgID });
    for (let project of projects) {
        await Project.findOneAndDelete({ _id: project._id });
    }
}

export async function deleteProject(projectID) {
    return Project.findOneAndDelete({ _id: projectID });
}

export async function updateProject(projectID, body) {
    return Project.findOneAndUpdate(
        { _id: projectID },
        { name: body.name, description: body.description }
    );
}

export async function fetchProjectByID(organizationID, projectID) {
    const project = await Project.findOne({ _id: projectID });
    if (project && organizationID == `${project.organization}`) {
        return project;
    } else {
        throw new Error(
            "Project doesn't exist or you don't have permission to access."
        );
    }
}

export async function fetchProjects(organizationID) {
    const projects = await Project.find({ organization: organizationID });
    return projects;
}

export async function createProject(
    memberID,
    organizationID,
    name,
    description
) {
    const organization = await fetchByID(organizationID, memberID);
    const projects = await fetchProjects(organization._id);

    if (projects.length >= 5) {
        throw new Error("Max projects reached (" + projects.length + "/5)");
    }

    const project = new Project({
        name,
        description,
        organization: organization._id,
        sourcekey: generateKey(24),
        deploykey: generateKey(32),
    });
    await project.save();

    return project;
}
