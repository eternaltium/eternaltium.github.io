const terminal = document.querySelector(".terminal");
const output = terminal.querySelector(".output");
const inputLine = terminal.querySelector(".input-line");
const commandLine = terminal.querySelector("#command-line");

const shutdownText = `systemd[1]: Stopping target Timers.
systemd[1]: Stopping target Sound Card.
systemd[1]: Stopping target Swap.
systemd[1]: Stopping target Local File Systems (Pre).
systemd[1]: Stopping target Local File Systems.
systemd[1]: Stopped target Remote File Systems.
systemd[1]: Stopped target Swap.
systemd[1]: Stopped target Local File Systems (Pre).
systemd[1]: Stopped target Local File Systems.
systemd[1]: Stopped target Timers.
The system will shutdown now!`;

const rebootText = `systemd[1]: Stopping target Timers.
systemd[1]: Stopping target Sound Card.
systemd[1]: Stopping target Swap.
systemd[1]: Stopping target Local File Systems (Pre).
systemd[1]: Stopping target Local File Systems.
systemd[1]: Stopped target Remote File Systems.
systemd[1]: Stopped target Swap.
systemd[1]: Stopped target Local File Systems (Pre).
systemd[1]: Stopped target Local File Systems.
systemd[1]: Stopped target Timers.
The system will reboot now!`;

/**
 *
 * @param {String} text
 */

var i = 0;
async function write(text) {
    var speed = 7;
    if (i == 0) {
        text = "\n" + text;
    }
    if (i < text.length) {
        inputLine.style.display = "none";
        output.innerHTML += text.charAt(i);
        i++;
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => write(text), speed);
    } else {
        i = 0;
        inputLine.style.display = "block";
        commandLine.focus();
    }
}

function outputCommand() {
    const input = commandLine.value;
    const outputString = `\nconsole:  $&nbsp; ${input}`;
    output.innerHTML += outputString;
    commandLine.value = "";
    window.scrollTo(0, document.body.scrollHeight);
    handleCommand(input);
}

function handleCommand(command) {
    if (command === "help") {
        const helpText = `Available commands:\n
        help - displays this message
        clear - clears the screen
        accounts - my accounts (always semi-updated)
        about - shows info about me (not much)
        quote - motivational quote 
        projects - current projects i'm working on
        
        More commands soon?`;
        write(helpText);
    } else if (command === "clear") {
        output.innerHTML = "";
    } else if (command === "about") {
        write("I'm eternal, 15 and I like to code in LuaU and sometimes HTML");
    } else if (command === "quote") {
        write("Never Back down... Never What?                          NEVER BACK DOWN                                                NEVER GIVE UP!                                                (unless ur an obese slob)");
    } else if (command === "projects") {
        write(
            `        c1v1 / roblox - https://discord.gg/hvyMzMeQWD
            general projects - https://github.com/eternaly1337`
            );
    } else if (command === "accounts") {
        write(
        `        Discord - @zzzzzzxiiiixzzzzzz : 1222005828954099782
        Youtube - @eternaly1337 / https://www.youtube.com/@eternwl
        E-z.host - @recelercy / https://e-z.bio/eternal`
        );
    } else if (command === "shutdown") {
        write(shutdownText);
        delete inputLine;
        setTimeout(function () {
            window.location.replace("https://e-z.bio/eternal");
        }, 1000);
    } else if (command === "reboot") {
        write(rebootText).then(() => {
            setTimeout(function () {
                window.location.replace("https://e-z.bio/eternal");
            }, 1000);
        });
    } else if (command === "") {
        output.innerHTML += "";
    } else {
        const errorText = `Command '${command}' not found. Type 'help' for a list of available commands.`;
        write(errorText);
    }
}

commandLine.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        window.scrollTo(0, document.body.scrollHeight);
        outputCommand();
    }
});
