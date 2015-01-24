class Api::InventoriesController < ApplicationController
  before_action :set_inventory, only: [:show, :edit, :update, :destroy]
  before_action :determine_scope, only: [:index]


  def index
    @inventories = @scope.all
    @types = {}
    PackageType.all.map(&:name).sort.each do |type|
      @types[type] = @inventories.kind(type).first.try(:quantity) || 0
    end
  end

  def show
  end

  def new
    @inventory = Inventory.new
  end

  def edit
  end

  def create
    @inventory = Inventory.new(params)
  end

  def update
  end

  def destroy
    @inventory.destroy
  end

  protected

  def determine_scope
    @scope = if params[:batch_id]
      Batch.find(params[:batch_id]).inventories
    else
      Inventory
    end
  end

  private

  def set_inventory
    @inventory = Inventory.find(params[:id])
  end

end
