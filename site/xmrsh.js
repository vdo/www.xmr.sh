// NB: This has no effect on rust-lang.org/install.html
function set_up_default_platform_buttons() {
    var defaults_buttons = document.getElementsByClassName('default-platform-button');
    for (var i = 0; i < defaults_buttons.length; i++) {
        defaults_buttons[i].onclick = go_to_default_platform;
    }
}

function fill_in_bug_report_values() {
    var nav_plat = document.getElementById("nav-plat");
    var nav_app = document.getElementById("nav-app");
    nav_plat.textContent = navigator.platform;
    nav_app.textContent = navigator.appVersion;
}

function clear_copy_status_message(id) {
    document.getElementById(id).innerText = '';
}

function process_copy_button_click(id) {
    try {
        navigator.clipboard.writeText(rustup_install_command).then(function() {
            document.getElementById(id).innerText = 'Copied!';
        });
        setTimeout(function () {
            clear_copy_status_message(id);
        }, 5000);
    } catch (e) {
        console.log('Hit a snag when copying to clipboard:', e);
    }
}

function handle_copy_button_click(e) {
    switch (e.id) {
        case 'copy-button-unix':
            process_copy_button_click('copy-status-message-unix');
            break;
        case 'copy-button-win32':
            process_copy_button_click('copy-status-message-win32');
            break;
        case 'copy-button-win64':
            process_copy_button_click('copy-status-message-win64');
            break;
        case 'copy-button-unknown':
            process_copy_button_click('copy-status-message-unknown');
            break;
        case 'copy-button-default':
            process_copy_button_click('copy-status-message-default');
            break;
    }
}

function set_up_copy_button_clicks() {
    var buttons = document.querySelectorAll(".copy-button");
    buttons.forEach(function (element) {
        element.addEventListener('click', function() {
            handle_copy_button_click(element);
        });
    })
}

(function () {
    adjust_for_platform();
    set_up_cycle_button();
    set_up_default_platform_buttons();
    set_up_copy_button_clicks();
    fill_in_bug_report_values();
}());
