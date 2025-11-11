class ApiResponse {
    constructor(status, user, message) {
        this.status = status;
        this.user = user;
        this.message = message;
    }
}

export{ApiResponse};