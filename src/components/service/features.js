export const convertCost = (cost) => {
    return cost.toLocaleString().replaceAll(",", ".");
};

export const validatePassword = (password) => {
    if (/(?=.*[!#$%&? "])/.test(password))
        return "Mật khẩu không chứa ký tự đặc biệt.";
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(password))
        return "Mật khẩu với ít nhất 8 kí tự. Ít nhất 1 ký tự thường, ký tự in hoa, số";
};

export const convertDate = (date_time) => {
    const date = new Date(date_time);

    const time = (v) => {
        const ans = new Intl.NumberFormat("en-US", {
            minimumIntegerDigits: 2,
        }).format(v);
        return ans;
    };

    return {
        date: `${time(date.getDate())}/
        ${time(date.getMonth() + 1)}/
        ${date.getFullYear()}`,

        time: `${time(date.getHours())}:
        ${time(date.getMinutes())}:
        ${time(date.getSeconds())}`,
    };
};
