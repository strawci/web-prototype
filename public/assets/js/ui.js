function toggleShowInput(query) {
    const el = document.querySelector(query);
    if (el) {
        if (el.type == "password") {
            el.type = "text";
        } else {
            el.type = "password";
        }
    }
}
