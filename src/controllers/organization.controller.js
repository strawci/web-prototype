import Org from "../models/organization.model";
import { deleteAllProjectsByOrg } from "./project.controller";

// import User from "../models/user.model";

export async function editOrganization(orgID, name) {
    return Org.findOneAndUpdate({ _id: orgID }, { name });
}

export async function deleteOrganization(orgID) {
    await Org.findOneAndDelete({ _id: orgID });
    await deleteAllProjectsByOrg(orgID);
}

export async function createOrganization(authorID, name) {
    const organizations = await Org.find({ owner: authorID });
    if (organizations.length >= 3) {
        throw new Error("Max organizations reached (3/3)");
    }

    const org = new Org({
        name,
        owner: authorID,
    });

    await org.save();

    return true;
}

export async function fetchOwnOrganizations(authorID) {
    const organizations = await Org.find({ owner: authorID });
    return organizations;
}

export async function fetchMemberOrganizations(member) {
    const organizations = await Org.find({
        members: { $in: [member] },
    });
    return organizations;
}

export async function fetchByID(id, requester) {
    const org = await Org.findOne({ _id: id })
        .populate("members")
        .populate("owner");
    if (
        org != null ||
        org.members.includes(requester) ||
        org.owner == requester
    ) {
        return org;
    } else {
        throw new Error(
            "This organizaton doesn't exists or you don't have permission to interact."
        );
    }
}
