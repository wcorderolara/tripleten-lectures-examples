import { redirect } from "react-router-dom";
import { deleteContact } from "../data/contacts";

export async function action( {params} ) {
    await deleteContact(params.contactId);
    return redirect("/");
}

/*
{
    params: {
        contactId: "something here"
    },
    request: {}
}
*/
