"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
var path_1 = require("path");
var discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers
    ]
});
client.commands = new discord_js_1.Collection();
var commandsPath = path_1.default.join(__dirname, 'commands');
var commandFiles = fs_1.default
    .readdirSync(commandsPath)
    .filter(function (file) { return file.endsWith('.ts'); });
commandFiles.forEach(function (file) {
    var filePath = path_1.default.join(commandsPath, file);
    var command = require(filePath);
    if (Object.prototype.hasOwnProperty.call(command, 'data') &&
        Object.prototype.hasOwnProperty.call(command, 'execute')) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
    }
});
var eventsPath = path_1.default.join(__dirname, 'events');
var eventFiles = fs_1.default
    .readdirSync(eventsPath)
    .filter(function (file) { return file.endsWith('.ts'); });
eventFiles.forEach(function (file) {
    var filePath = path_1.default.join(eventsPath, file);
    var event = require(filePath);
    try {
        if (Object.prototype.hasOwnProperty.call(event, 'once') && event.once) {
            client.once(event.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event.execute.apply(event, args);
            });
        }
        else {
            client.on(event.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event.execute.apply(event, args);
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
client.on(discord_js_1.Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand() &&
                    !interaction.isUserContextMenuCommand()) {
                    return [2 /*return*/];
                }
                command = interaction.client.commands.get(interaction.commandName);
                if (!command) {
                    console.error("No command matching ".concat(interaction.commandName, " was found."));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 5]);
                return [4 /*yield*/, command.execute(interaction)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [4 /*yield*/, interaction.reply({
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
client.login(process.env.botToken);
