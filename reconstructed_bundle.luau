--!strict
--[[
  extracted_source/reconstructed_bundle.luau
  Standalone All-In-One Monolithic Distribution
--]]

local Suite = {}
do

    -- ---------------- EleriumUI ----------------
    do
        --[[
          extracted_source/reconstructed/elerium_ui.luau
          Elerium UI component library with reactive constructors for Labels, Buttons, Toggles, Sliders, and Dropdowns
        --]]
        
        export type LabelConfig = {
            Text: string,
            TextColor3: Color3?,
            TextSize: number?,
            Size: UDim2?,
            Position: UDim2?,
        }
        
        export type ButtonConfig = {
            Text: string,
            BackgroundColor3: Color3?,
            TextColor3: Color3?,
            Size: UDim2?,
            Position: UDim2?,
        }
        
        export type ToggleConfig = {
            Label: string,
            Default: boolean,
            OnToggle: (boolean) -> (),
        }
        
        export type SliderConfig = {
            Label: string,
            Min: number,
            Max: number,
            Default: number,
            OnUpdate: (number) -> (),
        }
        
        export type DropdownConfig = {
            Label: string,
            Options: {string},
            Default: string?,
            OnSelect: (string) -> (),
        }
        
        local EleriumUI = {}
        
        function EleriumUI.CreateLabel(parent: GuiObject, text: string, config: any?): TextLabel
            local label = Instance.new("TextLabel")
            label.Text = text
            label.Size = UDim2.new(1, 0, 0, 17)
            label.BackgroundTransparency = 1
            label.TextColor3 = Color3.fromRGB(255, 255, 255)
            label.TextXAlignment = Enum.TextXAlignment.Left
            label.Parent = parent
            return label
        end
        
        function EleriumUI.CreateButton(parent: GuiObject, text: string, onClick: () -> ()): TextButton
            local button = Instance.new("TextButton")
            button.Text = text
            button.Size = UDim2.new(0, 130, 0, 20)
            button.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
            button.TextColor3 = Color3.fromRGB(255, 255, 255)
            button.Parent = parent
            button.MouseButton1Click:Connect(onClick)
            return button
        end
        
        function EleriumUI.CreateToggle(parent: GuiObject, label: string, defaultState: boolean, onToggle: (boolean) -> ()): Frame
            local frame = Instance.new("Frame")
            frame.Size = UDim2.new(1, 0, 0, 20)
            frame.BackgroundTransparency = 1
            frame.Parent = parent
        
            local toggleLabel = Instance.new("TextLabel")
            toggleLabel.Text = label
            toggleLabel.Size = UDim2.new(0, 100, 1, 0)
            toggleLabel.BackgroundTransparency = 1
            toggleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
            toggleLabel.Parent = frame
        
            local toggleButton = Instance.new("TextButton")
            local state = defaultState
            toggleButton.Text = state and "ON" or "OFF"
            toggleButton.Size = UDim2.new(0, 50, 1, 0)
            toggleButton.Position = UDim2.new(0, 110, 0, 0)
            toggleButton.BackgroundColor3 = state and Color3.fromRGB(50, 150, 50) or Color3.fromRGB(150, 50, 50)
            toggleButton.Parent = frame
        
            toggleButton.MouseButton1Click:Connect(function()
                state = not state
                toggleButton.Text = state and "ON" or "OFF"
                toggleButton.BackgroundColor3 = state and Color3.fromRGB(50, 150, 50) or Color3.fromRGB(150, 50, 50)
                onToggle(state)
            end)
        
            return frame
        end
        
        function EleriumUI.CreateSlider(parent: GuiObject, label: string, min: number, max: number, defaultVal: number, onUpdate: (number) -> ()): Frame
            local frame = Instance.new("Frame")
            frame.Size = UDim2.new(1, 0, 0, 30)
            frame.BackgroundTransparency = 1
            frame.Parent = parent
        
            local sliderLabel = Instance.new("TextLabel")
            sliderLabel.Text = label .. ": " .. tostring(defaultVal)
            sliderLabel.Size = UDim2.new(0, 120, 1, 0)
            sliderLabel.BackgroundTransparency = 1
            sliderLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
            sliderLabel.Parent = frame
        
            local track = Instance.new("Frame")
            track.Size = UDim2.new(0, 150, 0, 6)
            track.Position = UDim2.new(0, 130, 0.5, -3)
            track.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
            track.BorderSizePixel = 0
            track.Parent = frame
        
            local thumb = Instance.new("TextButton")
            thumb.Size = UDim2.new(0, 14, 0, 14)
            local alpha = math.clamp((defaultVal - min) / math.max(max - min, 1), 0, 1)
            thumb.Position = UDim2.new(alpha, -7, 0.5, -7)
            thumb.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
            thumb.Text = ""
            thumb.Parent = track
        
            local currentVal = defaultVal
            thumb.MouseButton1Down:Connect(function()
                sliderLabel.Text = label .. ": " .. tostring(currentVal)
                onUpdate(currentVal)
            end)
        
            return frame
        end
        
        function EleriumUI.CreateDropdown(parent: GuiObject, label: string, options: {string}, onSelect: (string) -> ()): Frame
            local frame = Instance.new("Frame")
            frame.Size = UDim2.new(1, 0, 0, 30)
            frame.BackgroundTransparency = 1
            frame.Parent = parent
        
            local dropdownLabel = Instance.new("TextLabel")
            dropdownLabel.Text = label
            dropdownLabel.Size = UDim2.new(0, 100, 1, 0)
            dropdownLabel.BackgroundTransparency = 1
            dropdownLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
            dropdownLabel.Parent = frame
        
            local selectButton = Instance.new("TextButton")
            selectButton.Text = options[1] or "Select..."
            selectButton.Size = UDim2.new(0, 140, 1, 0)
            selectButton.Position = UDim2.new(0, 110, 0, 0)
            selectButton.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
            selectButton.TextColor3 = Color3.fromRGB(255, 255, 255)
            selectButton.Parent = frame
        
            local listFrame = Instance.new("Frame")
            listFrame.Size = UDim2.new(0, 140, 0, #options * 22)
            listFrame.Position = UDim2.new(0, 110, 1, 0)
            listFrame.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
            listFrame.Visible = false
            listFrame.ZIndex = 5
            listFrame.Parent = frame
        
            selectButton.MouseButton1Click:Connect(function()
                listFrame.Visible = not listFrame.Visible
            end)
        
            for i, opt in ipairs(options) do
                local optBtn = Instance.new("TextButton")
                optBtn.Text = opt
                optBtn.Size = UDim2.new(1, 0, 0, 20)
                optBtn.Position = UDim2.new(0, 0, 0, (i - 1) * 22)
                optBtn.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
                optBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
                optBtn.ZIndex = 6
                optBtn.Parent = listFrame
        
                optBtn.MouseButton1Click:Connect(function()
                    selectButton.Text = opt
                    listFrame.Visible = false
                    onSelect(opt)
                end)
            end
        
            return frame
        end
        
        Suite.EleriumUI = EleriumUI
    end

    -- ---------------- MovementController ----------------
    do
        --[[
          extracted_source/reconstructed/movement_controller.luau
          Roblox Humanoid movement, pathfinding waypoint cancellation, WalkSpeed/JumpPower physics controller
        --]]
        
        export type MovementState = {
            [string]: boolean
        }
        
        export type WaypointConfig = {
            [string]: {Vector3}
        }
        
        local MovementController = {}
        
        function MovementController.CancelMove(character: Model, actionName: string?): ()
            local humanoid = character:FindFirstChildOfClass("Humanoid")
            if humanoid then
                local rootPart = character:FindFirstChild("HumanoidRootPart") :: BasePart?
                if rootPart then
                    humanoid:MoveTo(rootPart.Position)
                end
            end
        end
        
        function MovementController.SetSpeed(humanoid: Humanoid, speed: number): ()
            humanoid.WalkSpeed = speed
        end
        
        function MovementController.SetJumpPower(humanoid: Humanoid, power: number): ()
            humanoid.JumpPower = power
        end
        
        function MovementController.MoveToTarget(humanoid: Humanoid, targetPosition: Vector3, timeout: number?): boolean
            local success, result = pcall(function()
                humanoid:MoveTo(targetPosition)
                if timeout and timeout > 0 then
                    local startTime = tick()
                    local finished = false
                    local conn: RBXScriptConnection? = nil
                    conn = humanoid.MoveToFinished:Connect(function(reached: boolean)
                        finished = true
                        if conn then
                            conn:Disconnect()
                        end
                    end)
                    while not finished and (tick() - startTime < timeout) do
                        task.wait(0.05)
                    end
                    if conn then
                        conn:Disconnect()
                    end
                    return finished
                end
                return true
            end)
            return success and result or false
        end
        
        Suite.MovementController = MovementController
    end

    -- ---------------- HoneyConversion ----------------
    do
        --[[
          extracted_source/reconstructed/honey_conversion.luau
          Bee Swarm Simulator Honey & Pollen Conversion, Hive deposit trigger, Micro-converters and Balloon automation
        --]]
        
        export type ConversionConfig = {
            BalloonRoot: Instance,
            SpawnPos: Instance,
            GuiAttach: Instance,
            Bar: Instance,
            TextLabel: Instance,
        }
        
        export type HiveData = {
            Balloons: Instance,
            HiveBalloons: Instance,
            BoostBalls: Instance,
            Campsite: Instance,
            ClassicMinigame: Instance,
            Cubs: Instance,
            Faces: Instance,
            FieldDecos: Instance,
            Frame: Instance,
            Frogs: Instance,
            Goo: Instance,
            Paths: Instance,
            InvisibleWalls: Instance,
            Leaderboards: Instance,
            Territories: Instance,
            TheGamesEvent: Instance,
            TheGames_WideBanners: Instance,
            BeeBearHive: Instance,
            NoobBear: Instance,
            OnettNPC: Instance,
            ProBear: Instance,
            TopBear: Instance,
            BuckoAtHQ: Instance,
            RileyAtHQ: Instance,
            Honey: Instance,
            Lion: Instance,
            Map: Instance,
            Fences: Instance,
            HiveModels: Instance,
            StickerCanvases: Instance,
            HivePlatforms: Instance,
            Decorations: Instance,
            Misc: Instance,
            ["35ZoneCave"]: Instance,
            BubbleWandChimney: Instance,
            TreatBooth: Instance,
            CoconutField: Instance,
            PepperPatch: Instance,
            PineTree: Instance,
            SpiderCave: Instance,
            PetalShop: Instance,
            JumpGames: Instance,
            PEggMaze: Instance,
            Dandelion: Instance,
            Clover: Instance,
            Rose: Instance,
            Sign: Instance,
            Glider: Instance,
            ShopWord: Instance,
        }
        
        local HoneyConversion = {}
        
        function HoneyConversion.SendHoney(converterRemote: any, confirm: boolean): ()
            if typeof(converterRemote) == "Instance" and converterRemote:IsA("RemoteFunction") then
                converterRemote:InvokeServer(confirm)
            elseif typeof(converterRemote) == "Instance" and converterRemote:IsA("RemoteEvent") then
                converterRemote:FireServer(confirm)
            end
        end
        
        function HoneyConversion.ConvertAtHive(hivePosition: Vector3, playerPollen: number): boolean
            local workspace = game:GetService("Workspace")
            local hiveFolder = workspace:FindFirstChild("Hive")
            if hiveFolder then
                local balloons = hiveFolder:FindFirstChild("Balloons")
                if balloons then
                    local fieldBalloons = balloons:FindFirstChild("FieldBalloons")
                    if fieldBalloons then
                        fieldBalloons:ClearAllChildren()
                    end
                end
            end
            return true
        end
        
        function HoneyConversion.UseMicroConverter(inventoryRemote: any): boolean
            if typeof(inventoryRemote) == "Instance" and inventoryRemote:IsA("RemoteFunction") then
                local res = inventoryRemote:InvokeServer("Micro-Converter")
                return res ~= nil
            elseif typeof(inventoryRemote) == "Instance" and inventoryRemote:IsA("RemoteEvent") then
                inventoryRemote:FireServer("Micro-Converter")
                return true
            end
            return false
        end
        
        function HoneyConversion.CheckPollenCapacity(currentPollen: number, maxPollen: number): boolean
            return currentPollen >= maxPollen
        end
        
        Suite.HoneyConversion = HoneyConversion
    end

    -- ---------------- GameplayAutofarm ----------------
    do
        --[[
          extracted_source/reconstructed/gameplay_autofarm.luau
          Bee Swarm Simulator Autofarm: Sprout detector, Token / DupedTokens collection hook, Flower field gatherer, Mob alerts
        --]]
        
        export type SproutData = {
            [string]: boolean
        }
        
        export type TokenCollectorConfig = {
            [string]: (any) -> ()
        }
        
        export type FieldConfig = {
            [string]: (string, number) -> ()
        }
        
        export type ConnectionGroup = {RBXScriptConnection}
        
        local GameplayAutofarm = {}
        
        function GameplayAutofarm.HookSprouts(sproutsFolder: Folder, onSproutSpawned: (Instance) -> ()): ConnectionGroup
            local sprouts: {[Instance]: boolean} = {}
            local connections: ConnectionGroup = {}
        
            local conn1 = sproutsFolder.ChildAdded:Connect(function(child: Instance)
                if child.Name == "Sprout" then
                    sprouts[child] = true
                    onSproutSpawned(child)
                end
            end)
            table.insert(connections, conn1)
        
            local conn2 = sproutsFolder.ChildRemoved:Connect(function(child: Instance)
                if child.Name == "Sprout" then
                    sprouts[child] = nil
                end
            end)
            table.insert(connections, conn2)
        
            for _, child in ipairs(sproutsFolder:GetChildren()) do
                if child.Name == "Sprout" then
                    sprouts[child] = true
                    onSproutSpawned(child)
                end
            end
        
            return connections
        end
        
        function GameplayAutofarm.HookDupedTokens(animator: any, onTokenCollect: (any) -> ()): ()
            if not animator then
                return
            end
        
            local function onTokenSpawned(token: any)
                onTokenCollect(token)
            end
        
            if typeof(animator.Spawn) == "RBXScriptSignal" then
                animator.Spawn:Connect(onTokenSpawned)
            end
            if typeof(animator.Destroy) == "RBXScriptSignal" then
                animator.Destroy:Connect(onTokenSpawned)
            end
            if typeof(animator.Charge) == "RBXScriptSignal" then
                animator.Charge:Connect(onTokenSpawned)
            end
            if typeof(animator.Uncharge) == "RBXScriptSignal" then
                animator.Uncharge:Connect(onTokenSpawned)
            end
        
            local camera = workspace.CurrentCamera
            if camera then
                local dupedTokensFolder = camera:FindFirstChild("DupedTokens")
                if dupedTokensFolder then
                    dupedTokensFolder:ClearAllChildren()
                end
            end
        end
        
        function GameplayAutofarm.GatherField(fieldName: string, duration: number): ()
            local flowerZones = workspace:FindFirstChild("FlowerZones")
            if not flowerZones then
                return
            end
            local fieldPart = flowerZones:FindFirstChild(fieldName) :: BasePart?
            if not fieldPart then
                return
            end
            local player = game:GetService("Players").LocalPlayer
            local character = player.Character
            if character then
                local humanoid = character:FindFirstChildOfClass("Humanoid")
                if humanoid then
                    humanoid:MoveTo(fieldPart.Position)
                end
            end
        end
        
        function GameplayAutofarm.DetectMobs(workspaceMobs: Folder): {string}
            local mobNames: {string} = {}
            for _, mob in ipairs(workspaceMobs:GetChildren()) do
                if mob:IsA("Model") and mob:FindFirstChildOfClass("Humanoid") then
                    table.insert(mobNames, mob.Name)
                end
            end
            return mobNames
        end
        
        Suite.GameplayAutofarm = GameplayAutofarm
    end

    -- ---------------- CameraSettings ----------------
    do
        --[[
          extracted_source/reconstructed/camera_settings.luau
          Roblox Camera & GameSettings configuration: TouchCameraMovementMode, Camera orientation alignment, FOV & Zoom limits
        --]]
        
        export type CameraConfig = {
            TouchCameraMovementMode: number,
            CameraOrientation: CFrame,
            FieldOfView: number,
            MaxZoomDistance: number
        }
        
        local CameraSettings = {}
        
        function CameraSettings.SetTouchCameraMovementMode(mode: number): ()
            pcall(function()
                local userSettings = UserSettings()
                local gameSettings = userSettings:GetService("UserGameSettings")
                gameSettings.TouchCameraMovementMode = Enum.TouchCameraMovementMode.Default
            end)
        end
        
        function CameraSettings.AlignCameraToCFrame(camera: Camera, targetCFrame: CFrame): ()
            camera.CFrame = targetCFrame
        end
        
        function CameraSettings.SetFieldOfView(camera: Camera, fov: number): ()
            camera.FieldOfView = math.clamp(fov, 1, 120)
        end
        
        function CameraSettings.SetMaxZoom(player: Player, maxDistance: number): ()
            player.CameraMaxZoomDistance = maxDistance
        end
        
        Suite.CameraSettings = CameraSettings
    end

    -- ---------------- NetworkRemotes ----------------
    do
        --[[
          extracted_source/reconstructed/network_remotes.luau
          Network RemoteEvent & RemoteFunction dispatcher, ClientCall quest hook, TouchInterest bypass, Webhook notifications
        --]]
        
        export type RemoteDispatchConfig = { remote: RemoteEvent | RemoteFunction, args: {any} }
        export type WebhookPayload = { url: string, title: string, description: string }
        
        local NetworkRemotes = {}
        
        function NetworkRemotes.FireServer(remote: RemoteEvent, ...: any): ()
            remote:FireServer(...)
        end
        
        function NetworkRemotes.InvokeServer(remote: RemoteFunction, ...: any): any
            return remote:InvokeServer(...)
        end
        
        function NetworkRemotes.HookClientCall(eventsTable: any, onQuestComplete: (string, any) -> ()): ()
            if not eventsTable or not eventsTable.ClientCall then
                return
            end
        
            local originalCall = eventsTable.ClientCall
            eventsTable.ClientCall = function(...)
                local args = {...}
                local action = args[1]
                if action == "CompleteQuest" or action == "CompleteQuestFromPool" then
                    pcall(onQuestComplete, action, args[2])
                end
                return originalCall(...)
            end
        end
        
        function NetworkRemotes.SetTouchInterestEnabled(part: BasePart, enabled: boolean): ()
            local touchInterest = part:FindFirstChild("TouchInterest")
            if touchInterest and touchInterest:IsA("TouchTransmitter") then
                part.CanTouch = enabled
            else
                part.CanTouch = enabled
            end
        end
        
        function NetworkRemotes.SendWebhook(payload: WebhookPayload): ()
            local httpService = game:GetService("HttpService")
            local body = httpService:JSONEncode({
                embeds = {
                    {
                        title = payload.title,
                        description = payload.description,
                        color = 65280
                    }
                }
            })
            pcall(function()
                httpService:PostAsync(payload.url, body, Enum.HttpContentType.ApplicationJson)
            end)
        end
        
        Suite.NetworkRemotes = NetworkRemotes
    end

end

return Suite
