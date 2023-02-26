load-submodules:
	git submodule init && git submodule update
	cd backend/concordium-lsp/deps/concordium-rust-sdk/
	git submodule init && git submodule update
	cd backend/concordium-lsp/deps/concordium-rust-sdk/concordium-base/
	git submodule init && git submodule update
